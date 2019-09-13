const css = require('@zeit/next-css')

module.exports = css({
  cssLoaderOptions: {
    url: false
  },
  publicRuntimeConfig: {
    apiUri: 'http://snaekomu.xyz:3000/api/v1'
  }
})
