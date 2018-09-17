export default class Canvas {
  constructor(canvas_id, wasm_module, initial_x, initial_y){
    this.canvas = document.getElementById(canvas_id);
    this.canvas.addEventListener('click', this.clickEvent.bind(this));
    this.canvas.addEventListener('keydown', this.keyDownEvent.bind(this));
    this.viewpoint = new Float64Array([initial_x, initial_y]);
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
      this.redrawFromViewpoint(x,y);
    }
    else
      console.log("outside");
  }

  keyDownEvent(event){
    let dx=0;
    let dy=0;
    let velocity=3;
    if(event.code === "ArrowUp")
      dy -= velocity; // y is swapped (canvas coordinates)
    else if(event.code === "ArrowDown")
      dy += velocity; // y is swapped (canvas coordinates)
    else if(event.code === "ArrowLeft")
      dx -= velocity;
    else if(event.code === "ArrowRight")
      dx += velocity;

    let new_x = this.viewpoint[0] + dx;
    let new_y = this.viewpoint[1] + dy;

    if(this.wasm_module._isInsidePolygon(new_x, new_y) === 1){
      console.log("still inside");
      this.redrawFromViewpoint(new_x, new_y);
    }
    else{
      console.log("hit border");
    }
  }

  redrawFromViewpoint(x,y){
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

  setViewpoint(vp){
    this.viewpoint = vp;
  }

  setPolygon(plg){
    this.polygon = plg;
  }

  setViewpolygon(vplg){
    this.view_polygon = vplg;
  }

  getWidth(){
    return this.canvas.width;
  }

  getHeight(){
    return this.canvas.height;
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
