const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/${{ repoName }}/',
  transpileDependencies: true,
})
