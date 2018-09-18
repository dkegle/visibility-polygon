import Canvas from './canvas.js';
import DataManager from './data_manager.js';
import StateManager from './state_manager.js';

import style from './style.css';

// initial country and initial viewpoint
let initial_state = { country_id: 'slovenia', x: 185.0, y: 135.0 };

let canvas = new Canvas('canvas', Module);
let data_manager = new DataManager(Module, canvas.getWidth(), canvas.getHeight());
let state_manager = new StateManager(Module, canvas, data_manager, initial_state);


Module.onRuntimeInitialized = state_manager.render;
