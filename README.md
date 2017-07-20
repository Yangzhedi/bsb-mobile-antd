# bsb-mobile-antd

[![ENV](https://img.shields.io/badge/react-^15.4.2-blue.svg)](https://github.com/Yangzhedi/bsb-mobile-antd)
[![ENV](https://img.shields.io/badge/antd-1.1.0-blue.svg)](https://github.com/Yangzhedi/bsb-mobile-antd)
[![ENV](https://img.shields.io/badge/webpack-^1.13.1-blue.svg)](https://github.com/Yangzhedi/bsb-mobile-antd)


### Install & Start

```shell
npm i
npm start
```

open http://localhost:8000/

### Build

```sh
npm run build  # then see dist dir
# Note: you should remove `webpack-visualizer-plugin / webpack-bundle-analyzer` code in webpack.config.js file for production environment.
```

bundle analyzer tools: 
[webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) / 
[webpack-visualizer-plugin](https://www.npmjs.com/package/webpack-visualizer-plugin) 
(Note: [just for dist bundle file analyse](https://github.com/th0r/webpack-bundle-analyzer/issues/86))
