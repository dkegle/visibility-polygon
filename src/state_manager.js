export default class StateManager {
  constructor(wasm_module, canvas, data_manager, initial_country){
    this.data_manager = data_manager;
    this.wasm_module = wasm_module;
    this.canvas = canvas;
    this.current_country = initial_country;
    this.render = this.render.bind(this);

    this.country_form = document.getElementById("country-form");
    for(let i=0; i<this.country_form.length; i++){
      this.country_form[i].onclick = _ => {
        this.current_country = this.country_form[i].id;
        this.render();
      }
    }
  }

  async render(){
    let cd = await this.data_manager.getCountryData(this.current_country);

    this.canvas.setPolygon(cd.coordinates);
    this.wasm_module._setPolygon(cd.buffer_ptr, cd.num_elements);

    this.wasm_module._runVisPoly(cd.viewpoint_x, cd.viewpoint_y);
    let res_ptr = this.wasm_module._getVisPoly();
    let res_sz = this.wasm_module._getVisPolySize();
    let res = new Float64Array(this.wasm_module.HEAPF64.buffer, res_ptr, res_sz);
    this.canvas.setViewpolygon(res);
    this.canvas.setCountry(this.current_country);
    this.canvas.setViewpoint(cd.viewpoint_x, cd.viewpoint_y);
    this.canvas.draw();
  }
}
