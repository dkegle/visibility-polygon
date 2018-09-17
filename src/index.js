import Canvas from './canvas.js';


var canvas = new Canvas('canvas', Module);

let viewpoint = new Float64Array([50.0, 100.0]);
let polygon = new Float64Array([]);
let view_polygon = new Float64Array([50.0, 50.0, 75.0, 75.0, 120.0, 50.0]);

canvas.setViewpoint(viewpoint);
canvas.setPolygon(polygon);
canvas.setViewpolygon(view_polygon);


Module.onRuntimeInitialized = async _ => {
  let slo = await fetch('build/slo.geojson');
  slo = await slo.json();
  let coordinates = slo.features[0].geometry.coordinates[0];
  let num_coords = slo.features[0].geometry.coordinates[0].length;

  var num_bits = 64;
  var num_elements = num_coords*2;
  var ptr_polygon = Module._malloc(num_bits*num_elements);
  var polygon = new Float64Array(Module.HEAPF64.buffer, ptr_polygon, num_elements);

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
  const diff_x=max_x-min_x;
  const diff_y=max_y-min_y;
  const aspect_ratio=diff_x/diff_y;
  for(let i=0; i<num_coords; i++){
    polygon[2*i] = (polygon[2*i]-min_x)/diff_x*400.0;
    polygon[2*i+1] = 400-(polygon[2*i+1]-min_y)/diff_y*400.0;
    if(aspect_ratio < 1)
      polygon[2*i] /= aspect_ratio;
    else
      polygon[2*i+1] /= aspect_ratio;
  }

  canvas.setPolygon(polygon);
  Module._setPolygon(ptr_polygon, num_elements);

  canvas.draw();
};
