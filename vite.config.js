import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
const { resolve } = require('path')

// import styleImport from 'vite-plugin-style-import'
// import ViteComponents, { ElementPlusResolver } from 'vite-plugin-components'

// https://vitejs.dev/config/
export default defineConfig({
 
  publicPath:'/molu00.gitee.io/wyy-music_vite_v3_pc/',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      // 'utils': resolve(__dirname, './src/utils'),
      // 'static': resolve(__dirname, './src/static'),
      // 'imgs': resolve(__dirname, './src/static/imgs'),
    }
  },
  plugins: [
    vue(),

    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  build: {
    assetsDir: "./static",
    rollupOptions: {

      input: {
         // 入口文件
        main: resolve(__dirname, "index.html"),
         // 其他入口
        // project: resolve(__dirname, "project.html")
      },
      // output: {
      //   chunkFileNames: 'static/js/[name]-[hash].js',
      //   entryFileNames: "static/js/[name]-[hash].js",
      //   assetFileNames: "static/[ext]/name-[hash].[ext]"
      // }
    },
  },
  // publicPath: './',

  // devServer:{
  //   proxy:{
  //     '/api':{
  //       target:'/',
  //       changeOrigin:true,
  //       pathRewrite:{
  //         '^/api':''
  //       }
  //     }
  //   }
  // }
})
