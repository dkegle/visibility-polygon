export default class DataManager {
  constructor(wasm_module, canvas_width, canvas_height){
    this.countries = {};
    this.wasm_module = wasm_module;
    this.canvas_width = canvas_width;
    this.canvas_height = canvas_height;
  }

  async getCountryData(country){
    if(country in this.countries)
      return this.countries[country];

    let raw = await fetch('build/' + country + ".geojson");
    raw = await raw.json();
    let coordinates = raw.features[0].geometry.coordinates[0];
    let num_coords = coordinates.length;

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
    for(let i=0; i<num_coords; i++){
      polygon[2*i] = (polygon[2*i]-min_x)/diff_x*(this.canvas_width);
      polygon[2*i+1] = this.canvas_height-(polygon[2*i+1]-min_y)/diff_y*(this.canvas_height);
      if(aspect_ratio < 1)
        polygon[2*i] *= aspect_ratio;
      else
        polygon[2*i+1] /= aspect_ratio;
    }

    this.countries[country] = {coordinates: polygon,
      buffer_ptr: ptr_polygon,
      num_elements: num_elements
    };

    return this.countries[country];
  }

}
