import Canvas from './canvas.js';
import DataManager from './data_manager.js';
import StateManager from './state_manager.js';

require('./style.css');

// initial country and initial viewpoint
let initial_country = 'slovenia';
let initial_x = 300.0;
let initial_y = 250.0;

let canvas = new Canvas('canvas', Module);
let data_manager = new DataManager(Module, canvas.getWidth(), canvas.getHeight(),
  initial_x, initial_y);
let state_manager = new StateManager(Module, canvas, data_manager, initial_country);

canvas.updateViewpoint = data_manager.setNewViewpoint.bind(data_manager);
Module.onRuntimeInitialized = state_manager.render;
