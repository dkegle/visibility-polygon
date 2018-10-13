export default class DataManager {
  constructor(wasm_module, canvas_width, canvas_height, initial_x, initial_y){
    this.countries = {};
    this.wasm_module = wasm_module;
    this.canvas_width = canvas_width;
    this.canvas_height = canvas_height;
    this.initial_x = initial_x;
    this.initial_y = initial_y;
    this.changeViewpoint = this.changeViewpoint.bind(this);
  }

  changeViewpoint({country, viewpoint_x, viewpoint_y}){
    this.countries[country].viewpoint_x = viewpoint_x;
    this.countries[country].viewpoint_y = viewpoint_y;
  }

  async getCountryData(country){
    if(country in this.countries)
      return this.countries[country];

    let raw = await fetch('data/' + country + ".geojson");
    raw = await raw.json();
    const coordinates = raw.features[0].geometry.coordinates[0];
    const num_coords = coordinates.length;

    let num_bits = 64;
    let num_elements = num_coords*2;
    let ptr_polygon = this.wasm_module._malloc(num_bits*num_elements);
    let polygon = new Float64Array(this.wasm_module.HEAPF64.buffer, ptr_polygon, num_elements);

    // find bbox, fill coordinates in buffer
    let max_x=Number.NEGATIVE_INFINITY;
    let max_y=max_x;
    let min_x=Number.POSITIVE_INFINITY;
    let min_y=min_x;
    for(let i=0; i<num_coords; i++){
      if(coordinates[i][0] > max_x)
        max_x = coordinates[i][0];
      if(coordinates[i][0] < min_x)
        min_x = coordinates[i][0];
      if(coordinates[i][1] > max_y)
        max_y = coordinates[i][1];
      if(coordinates[i][1] < min_y)
        min_y = coordinates[i][1];

      polygon[2*i] = coordinates[i][0];
      polygon[2*i+1] = coordinates[i][1];
    }

    // centering to canvas
    const diff_x=max_x-min_x;
    const diff_y=max_y-min_y;
    const aspect_ratio=diff_x/diff_y;
    let new_max_x=Number.NEGATIVE_INFINITY;
    let new_max_y=Number.NEGATIVE_INFINITY;
    for(let i=0; i<num_coords; i++){
      polygon[2*i] = (polygon[2*i]-min_x)/diff_x*this.canvas_width*0.95;
      polygon[2*i+1] = (this.canvas_height-(polygon[2*i+1]-min_y)/diff_y*this.canvas_height)*0.95;
      if(aspect_ratio < 1)
        polygon[2*i] *= aspect_ratio;
      else
        polygon[2*i+1] /= aspect_ratio;
      if(polygon[2*i] > new_max_x)
        new_max_x = polygon[2*i];
      if(polygon[2*i+1] > new_max_y)
        new_max_y = polygon[2*i+1];
    }

    const translate_x = (this.canvas_width - new_max_x)/2.0;
    const translate_y = (this.canvas_height - new_max_y)/2.0;
    for(let i=0; i<num_coords; i++){
      polygon[2*i] += translate_x;
      polygon[2*i+1] += translate_y;
    }

    this.countries[country] = {coordinates: polygon,
      buffer_ptr: ptr_polygon,
      num_elements: num_elements,
      viewpoint_x: this.initial_x,
      viewpoint_y: this.initial_y
    };

    return this.countries[country];
  }

}
