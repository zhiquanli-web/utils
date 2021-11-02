module.exports = {
  lintOnSave: false,
  devServer: {
    open: "true",
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "./src/assets/styles/vw.scss";`,
      },
    },
  },
};
