{
  "name": "your-awesome-package",
  "version": "0.1.0",
  "description": "your-awesome-package",
  "main": "index.js",
  "scripts": {
    "build": "rm -rf ./dist && npm run build:js",
    "build:js": "webpack -p --progress --config ./webpack.config.js"
  },
  "repository": {},
  "bugs": {},
  "homepage": "",
  "devDependencies": {
    "@babel/cli": "^7.7.5",
    "@babel/core": "^7.7.5",
    "@babel/preset-env": "^7.7.6",
    "babel-loader": "^8.0.6",
    "webpack": "^4.41.2",
    "webpack-cli": "^3.3.10"
  }
}
