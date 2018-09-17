export default class Canvas {
  constructor(canvas_id, wasm_module){
    this.canvas = document.getElementById(canvas_id);
    this.canvas.addEventListener('click', this.clickEvent.bind(this));
    this.viewpoint = new Float64Array([]);
    this.polygon = new Float64Array([]);
    this.view_polygon = new Float64Array([]);
    this.wasm_module = wasm_module;
  }

  clickEvent(event){
    let x = event.pageX - this.canvas.offsetLeft;
    let y = event.pageY - this.canvas.offsetTop;
    console.log("clicked " + x + " " + y);
    if(this.wasm_module._isInsidePolygon(x,y) === 1){
      console.log("inside!");
      this.viewpoint[0]=x;
      this.viewpoint[1]=y;

      this.wasm_module._freeVisPoly();
      this.wasm_module._runVisPoly(x,y);
      let res_ptr = this.wasm_module._getVisPoly();
      let res_sz = this.wasm_module._getVisPolySize();
      let res = new Float64Array(this.wasm_module.HEAPF64.buffer, res_ptr, res_sz);
      this.setViewpolygon(res);
      this.draw();
    }
    else
      console.log("outside");
  }

  setViewpoint(vp){
    this.viewpoint = vp;
  }

  setPolygon(plg){
    this.polygon = plg;
  }

  setViewpolygon(vplg){
    this.view_polygon = vplg;
  }

  draw(){
    if (this.canvas.getContext) {
      let ctx = this.canvas.getContext('2d');
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      let draw_polygon = (coords, color) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(coords[0], coords[1]);
        for(let i=2; i<coords.length; i+=2)
          ctx.lineTo(coords[i], coords[i+1]);
        ctx.fill();
      }

      if(this.polygon.length >= 6)
        draw_polygon(this.polygon, 'grey');

      if(this.view_polygon.length >= 6)
        draw_polygon(this.view_polygon, 'orange');

      if(this.viewpoint.length === 2){
        let x=this.viewpoint[0];
        let y=this.viewpoint[1];

        ctx.fillStyle='pink';
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI*2, 0);
        ctx.fill();
      }
    }
  }
}
