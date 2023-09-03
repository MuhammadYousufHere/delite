import { merge } from 'webpack-merge'
import WebpackShellPluginNext from 'webpack-shell-plugin-next'

export default merge(
  {},
  {
    watch: true,
    mode: 'development',
    devtool: 'source-map',
    plugins: [
      new WebpackShellPluginNext({
        onBuildEnd: {
          scripts: [
            'nodemon --watch dist/delite.js --exec "node dist/delite.js"'
          ],
          blocking: false,
          parallel: true,
          safe: false
        }
      })
    ]
  }
)
