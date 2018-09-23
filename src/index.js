import Canvas from './canvas.js';
import DataManager from './data_manager.js';
import StateManager from './state_manager.js';

require('./css/style.scss');

// initial country and initial viewpoint
let initial_country = 'slovenia';
let initial_x = 300.0;
let initial_y = 250.0;

let colors = {slovenia: '#ffad33', brazil: '#40bf40',
  australia: '#ff8c66', uk: '#99ccff'};

let canvas = new Canvas('canvas', Module);
let data_manager = new DataManager(Module, canvas.getWidth(), canvas.getHeight(),
  initial_x, initial_y);
let state_manager = new StateManager(Module, canvas, data_manager, initial_country, colors);

canvas.updateViewpoint = data_manager.setNewViewpoint.bind(data_manager);
Module.onRuntimeInitialized = state_manager.render;
