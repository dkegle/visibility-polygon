import Canvas from './canvas.js';
import DataManager from './data_manager.js';

let initial_x = 120.0;
let initial_y = 100.0;
let initial_country = 'australia';

let canvas = new Canvas('canvas', Module, initial_x, initial_y);
let data_manager = new DataManager(Module, canvas.getWidth(), canvas.getHeight());


Module.onRuntimeInitialized = async _ => {
  let cd = await data_manager.getCountryData(initial_country);

  canvas.setPolygon(cd.coordinates);
  Module._setPolygon(cd.buffer_ptr, cd.num_elements);

  Module._runVisPoly(initial_x, initial_y);
  let res_ptr = Module._getVisPoly();
  let res_sz = Module._getVisPolySize();
  let res = new Float64Array(Module.HEAPF64.buffer, res_ptr, res_sz);
  canvas.setViewpolygon(res);
  canvas.draw();
};
