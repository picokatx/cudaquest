import {defineConfig} from 'vite';
import motionCanvas from '@motion-canvas/vite-plugin';
import ffmpeg from '@motion-canvas/ffmpeg';

export default defineConfig({
  assetsInclude: ['**/*.gltf', '**/*.bin'],
  server: {
    fs: {
      // let it load external files
      strict: false,
      allow: [
        '**/src/images'
      ]
    },
  },
  plugins: [
    motionCanvas(),
    ffmpeg(),
  ],
});
