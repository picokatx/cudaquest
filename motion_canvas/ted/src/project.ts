import {makeProject} from '@motion-canvas/core';

import example from './scenes/example?scene';
import example2 from './scenes/example2?scene';
import example3 from './scenes/example3?scene';

import audio from './audio/ted.mp4';
export default makeProject({
  scenes: [example3],
  audio: audio
});
