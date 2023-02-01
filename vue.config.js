const { defineConfig } = require('@vue/cli-service')
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = defineConfig({
  transpileDependencies: true,
  // plugins: [new MiniCssExtractPlugin()],
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  },

  css: {
    extract: false,
  }
})
