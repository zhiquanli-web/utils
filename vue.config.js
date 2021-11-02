module.exports = {
  lintOnSave: false,
  devServer: {
    open: "true",
  },
  css: {
    loaderOptions: {
      scss: {
        data: `@import "@/assets/styles/vw.scss";`,
      },
    },
  },
};
