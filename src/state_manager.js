export default class StateManager {
  constructor(wasm_module, canvas, data_manager, initial_state){
    this.data_manager = data_manager;
    this.wasm_module = wasm_module;
    this.canvas = canvas;
    this.state = initial_state;
    this.render = this.render.bind(this);

    this.country_form = document.getElementById("country-form");
    this.prev=this.state.country_id;
    for(let i=0; i<this.country_form.length; i++){
      this.country_form[i].onclick = _ => {
        this.state.country_id = this.country_form[i].id;
        this.render();
      }
    }
  }

  async render(){
    let cd = await this.data_manager.getCountryData(this.state.country_id);

    this.canvas.setPolygon(cd.coordinates);
    this.wasm_module._setPolygon(cd.buffer_ptr, cd.num_elements);

    this.wasm_module._runVisPoly(this.state.x, this.state.y);
    let res_ptr = this.wasm_module._getVisPoly();
    let res_sz = this.wasm_module._getVisPolySize();
    let res = new Float64Array(this.wasm_module.HEAPF64.buffer, res_ptr, res_sz);
    this.canvas.setViewpolygon(res);
    this.canvas.setViewpoint(this.state.x, this.state.y);
    this.canvas.draw();
  }
}
