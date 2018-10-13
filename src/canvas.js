export default class Canvas {
  constructor(canvas_id, wasm_module){
    this.canvas = document.getElementById(canvas_id);
    this.canvas.addEventListener('mousedown', this.mouseDown.bind(this));
    this.canvas.addEventListener('mousemove', this.mouseMove.bind(this));
    this.canvas.addEventListener('mouseup', this.mouseUp.bind(this));
    this.viewpoint_x = 1;
    this.viewpoint_y = 1;
    this.mouse_drag = false;
    this.polygon = new Float64Array([]);
    this.view_polygon = new Float64Array([]);
    this.wasm_module = wasm_module;
    this.current_country = '';
    this.vis_poly_color = '';
    this.onchange_callback = null;
  }

  mouseDown(event){
    let new_x = event.pageX - this.canvas.offsetLeft;
    let new_y = event.pageY - this.canvas.offsetTop;
    console.log("mousedown at " + new_x + " " + new_y);
    if(this.wasm_module._isInsidePolygon(new_x, new_y) === 1){
      console.log("inside!");
      this.mouse_drag = true;
      this.recalcVisibility(new_x, new_y);
    }
    else
      console.log("outside");
  }

  mouseMove(event) {
    if(this.mouse_drag) {
      let new_x = event.pageX - this.canvas.offsetLeft;
      let new_y = event.pageY - this.canvas.offsetTop;

      if(this.wasm_module._isInsidePolygon(new_x, new_y) === 1){
        console.log("dragging inside!");
        this.recalcVisibility(new_x, new_y);
      }
      else
        console.log("outside");
    }
  }

  mouseUp(event){
    this.mouse_drag = false;
  }

  // recalculates visibility polygon and redraws
  recalcVisibility(x,y){
    this.viewpoint_x=x;
    this.viewpoint_y=y;
    this.wasm_module._runVisPoly(x,y);
    let result_ptr = this.wasm_module._getVisPoly();
    let result_size = this.wasm_module._getVisPolySize();
    this.view_polygon = new Float64Array(this.wasm_module.HEAPF64.buffer, result_ptr, result_size);
    this.draw();
    if(this.onchange_callback){
      let self = this;
      this.onchange_callback({country: self.current_country,
        viewpoint_x: self.viewpoint_x,
        viewpoint_y: self.viewpoint_y});
    }
  }

  getWidth(){
    return this.canvas.width;
  }

  getHeight(){
    return this.canvas.height;
  }

  setData({country_name, country_color, viewpoint_x, viewpoint_y,
    plg, buffer_ptr, buffer_size, draw_callback, onchange_callback})
  {
    this.current_country = country_name;
    this.vis_poly_color = country_color;
    this.viewpoint_x = viewpoint_x;
    this.viewpoint_y = viewpoint_y;
    this.polygon = plg;
    this.wasm_module._setPolygon(buffer_ptr, buffer_size);
    this.onchange_callback = onchange_callback;
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
      ctx.arc(this.viewpoint_x, this.viewpoint_y, 5, 0, Math.PI*2, 0);
      ctx.fill();
    }
  }
}
