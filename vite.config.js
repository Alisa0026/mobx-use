import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ["@babel/plugin-proposal-decorators", { legacy: true }],// 装饰器插件
          ["@babel/plugin-proposal-class-properties", { loose: false }]//类的属性
        ]
      }
    })
  ]
})