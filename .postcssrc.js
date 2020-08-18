// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    // px transfrom rem plug config
    "postcss-pxtorem": {
        rootValue: 75,
        propList: ['*']
    }
  }
}
