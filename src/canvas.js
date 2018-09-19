export default class Canvas {
  constructor(canvas_id, wasm_module){
    this.canvas = document.getElementById(canvas_id);
    this.canvas.addEventListener('click', this.clickEvent.bind(this));
    this.canvas.addEventListener('keydown', this.keyDownEvent.bind(this));
    this.x = 1;
    this.y = 1;
    this.polygon = new Float64Array([]);
    this.view_polygon = new Float64Array([]);
    this.wasm_module = wasm_module;
    this.updateViewpoint = null;
    this.current_country = '';
    this.vis_poly_color = '';
  }

  clickEvent(event){
    let new_x = event.pageX - this.canvas.offsetLeft;
    let new_y = event.pageY - this.canvas.offsetTop;
    console.log("clicked " + new_x + " " + new_y);
    if(this.wasm_module._isInsidePolygon(new_x, new_y) === 1){
      console.log("inside!");
      this.updateViewpoint(this.current_country, new_x, new_y);
      this.redrawFromViewpoint(new_x, new_y);
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

    let new_x = this.x + dx;
    let new_y = this.y + dy;

    if(this.wasm_module._isInsidePolygon(new_x, new_y) === 1){
      console.log("still inside");
      this.updateViewpoint(this.current_country, new_x, new_y);
      this.redrawFromViewpoint(new_x, new_y);
    }
    else{
      console.log("hit border");
    }
  }

  // recalculates visibility polygon and then redraws (triggered on click or on keydown)
  redrawFromViewpoint(x,y){
    this.x=x;
    this.y=y;

    this.wasm_module._freeVisPoly();
    this.wasm_module._runVisPoly(x,y);
    let res_ptr = this.wasm_module._getVisPoly();
    let res_sz = this.wasm_module._getVisPolySize();
    let res = new Float64Array(this.wasm_module.HEAPF64.buffer, res_ptr, res_sz);
    this.setViewpolygon(res);
    this.draw();
  }

  setCountry(country, color){
    this.current_country = country;
    this.vis_poly_color = color;
  }

  setViewpoint(x, y){
    this.x = x;
    this.y = y;
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

  // draws canvas according to current data (doesn't recalculate)
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
        draw_polygon(this.polygon, '#e6e6e6'); // polygon

      if(this.view_polygon.length >= 6)
        draw_polygon(this.view_polygon, this.vis_poly_color); // vis poly

      if(this.polygon.length >= 6){
        ctx.strokeStyle = "#262626";  // border
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.polygon[0], this.polygon[1]);
        for(let i=2; i<this.polygon.length; i+=2)
          ctx.lineTo(this.polygon[i], this.polygon[i+1]);
        ctx.stroke();
      }

      ctx.fillStyle='#663300';
      ctx.beginPath();
      ctx.arc(this.x, this.y, 5, 0, Math.PI*2, 0);
      ctx.fill();
    }
  }
}
