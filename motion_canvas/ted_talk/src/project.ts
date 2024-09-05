import {makeProject} from '@motion-canvas/core';

import example from './scenes/example?scene';
import example3d from './scenes/example3d?scene';

export default makeProject({
  scenes: [example3d],
});
