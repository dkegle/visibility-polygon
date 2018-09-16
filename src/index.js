import Canvas from './canvas.js';


var canvas = new Canvas('canvas');

let viewpoint = new Int16Array([50, 100]);
let polygon = new Int16Array([30, 30, 30, 250, 250, 250, 250, 30]);
let view_polygon = new Int16Array([50, 50, 75, 75, 120, 50]);

canvas.setViewpoint(viewpoint);
canvas.setPolygon(polygon);
canvas.setViewpolygon(view_polygon);

canvas.draw();


Module.onRuntimeInitialized = async _ => {
  var num_bytes = 16;
  var num_elements = 3;
  var ptr = Module._malloc(num_bytes*num_elements);
  var arr = new Int16Array(Module.HEAP16.buffer, ptr, num_elements);

  arr.set([1,2,1]);

  Module._doubling(arr.byteOffset, num_elements);


  var g_ptr = Module._getG();
  var g_size = Module._getGSize();
  var arr2 = new Int16Array(Module.HEAP16.buffer, g_ptr, g_size);
  const result = new Uint16Array(arr2);

  Module._free_result();

  Module._free(ptr);

  console.log(result);
};
