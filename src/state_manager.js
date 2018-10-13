export default class StateManager {
  constructor(wasm_module, canvas, data_manager, initial_country, country_colors){
    this.data_manager = data_manager;
    this.wasm_module = wasm_module;
    this.canvas = canvas;
    this.current_country = initial_country;
    this.setActiveCountry = this.setActiveCountry.bind(this);
    this.country_colors = country_colors;

    // event listeners for changing countries
    this.country_form = document.getElementById("country-form");
    for(let i=0; i<this.country_form.length; i++){
      this.country_form[i].addEventListener('click', _ => {
        this.current_country = this.country_form[i].id;
        this.setActiveCountry(this.current_country);
      });
    }
  }

  async setActiveCountry(country){
    let d = await this.data_manager.getCountryData(country);

    let self = this;
    this.canvas.setData({
      country_name: self.current_country,
      country_color: self.country_colors[self.current_country],
      viewpoint_x: d.viewpoint_x,
      viewpoint_y: d.viewpoint_y,
      plg: d.coordinates,
      buffer_ptr: d.buffer_ptr,
      buffer_size: d.num_elements,
      onchange_callback: self.data_manager.changeViewpoint
    });

    this.canvas.recalcVisibility(d.viewpoint_x, d.viewpoint_y);
  }
}
