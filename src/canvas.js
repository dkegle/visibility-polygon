export default class Canvas {
  constructor(canvas_id){
    this.canvas = document.getElementById(canvas_id);
    this.canvas.addEventListener('click', this.clickEvent.bind(this));
    this.viewpoint = new Int16Array([]);
    this.polygon = new Int16Array([]);
    this.view_polygon = new Int16Array([]);
  }

  clickEvent(event){
    let x = event.pageX - this.canvas.offsetLeft;
    let y = event.pageY - this.canvas.offsetTop;
    console.log("clicked " + x + " " + y);
    let num_intersections = 0;

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
