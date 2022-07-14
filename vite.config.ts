import fs from "fs"
import { ConfigEnv, loadEnv, UserConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import { resolve } from 'path'
import { ElementPlusResolver, VantResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import WindiCSS from 'vite-plugin-windicss'
import {dataToEsm} from "rollup-pluginutils"

const CWD = process.cwd()

const prefix = `monaco-editor/esm/vs`

const rawSvgPlugin : Plugin = {
  name: 'raw-svg-file-loader',
  transform(svg: string, filepath: string) {
    // 判断后缀是否为svg
    if (filepath.slice(-4) !== '.svg') return null;
    const content = fs.readFileSync(filepath).toString()
    return {
      // 直接返回svg文件的原始内容
      code: dataToEsm(content)
    }
  },
}

export default ({ mode }: ConfigEnv): UserConfig => {
  const { VITE_BASE_URL } = loadEnv(mode, CWD)
  return { 
    base: VITE_BASE_URL,
    css: {
      modules: {
        localsConvention: 'camelCase'
      },
      preprocessorOptions:{
        scss: {
          charset: false,
        },
        less: {
          charset: false,
        }
      },
      charset: false,
      postcss:{
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              },
            },
          },
        ],
      }
    },
    plugins:[
      vue(),
      vueJsx(),
      WindiCSS(),
      legacy({
        targets: ['defaults', 'not IE 11']
      }),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        dts: true,
        imports: ['vue', 'vue-router'],
      }),
      Components({
        dts: true,
        resolvers: [ElementPlusResolver(), VantResolver()],
      }),
      rawSvgPlugin
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    build: {
      cssCodeSplit: true,
      sourcemap: false,
      target: 'modules',
      chunkSizeWarningLimit: 550,
      assetsInlineLimit: 4096,
      terserOptions:{
        compress: {
          drop_console: true, // 生产环境去除console
          drop_debugger: true, // 生产环境去除debugger
        },
      },
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          //preview: resolve(__dirname, 'preview/index.html')
        },
        output: {
          manualChunks: {
            jsonWorker: [`${prefix}/language/json/json.worker`],
            cssWorker: [`${prefix}/language/css/css.worker`],
            htmlWorker: [`${prefix}/language/html/html.worker`],
            tsWorker: [`${prefix}/language/typescript/ts.worker`],
            editorWorker: [`${prefix}/editor/editor.worker`]
          },
          globals: {
            jquery: 'window.jQuery'
          }
        }
      }
    },
    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        '@vueuse/core', 
        'element-plus', 
        'lodash-es', 
        'vuedraggable'
      ],
      exclude: ['vue-demi']
    },
    server: {
      host: '0.0.0.0',
      port: 8000, // 设置服务启动端口号
      open: false, // 设置服务启动时是否自动打开浏览器
      cors: true, // 允许跨域

      // 设置代理，根据项目实际情况配置
      proxy: {
        '/api': {
          target: 'http://29135jo738.zicp.vip/api/v1',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace('/api/', '/')
        }
      }
    }
  }
}
