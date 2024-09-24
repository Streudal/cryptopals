/*I couldn't find a vite.config.ts file. This is what would be in it if it existed though */

///<reference types = "vitest"/>
///<reference types = "vite/client"/>
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

//https://vitejs.dev/config
export default defineConfig({
  plugins:[react()],
  test:{
    globals: true, //no importing things like 'it' or 'describe' in all our files
    environment:'jsdom',
    setupFiles:'./src/test/setup.ts',
    //you might want to disable it, if you don't have tests that rely on it
    //since parsing CSS is clow
    css:true,//otherwise it won't parse your files!!!
  },
})