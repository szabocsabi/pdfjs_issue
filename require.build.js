({
  baseUrl: "./",
  appDir: "./build/",
  dir: "./release",
  modules: [
    {
      name: "app",
    },
    {
      name: "modules/Main/Main",
      exclude: ["app"]
    }
  ],
  optimize: 'none',
  optimizeCss: 'none',
  mainConfigFile: './build/require.config.js'
})
