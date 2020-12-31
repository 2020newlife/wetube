// 컨텍스트 경로 즉 서버에서 현재 프로젝트의 경로를 가져올 수 있다.
const path = require('path');
const ExtractCSS = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
// __dirname가 현재 프로젝트 디렉토리 네임이다.
const ENTRY_FILE = path.resolve(__dirname, 'assets', 'js', 'main.js');
const OUTPUT_DIR = path.join(__dirname, 'static');

const config = {
  entry: ['@babel/polyfill', ENTRY_FILE],
  module: {
    // webpack가 동작하는 법칙을 정의해준다.
    rules: [
      {
        test: /\.(js)$/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        // webpack가 scss파일들을 가져올 수 있도록 정규식으로 표현해준다.
        test: /\.(scss)$/,
        // extract-text-webpack-plugin 이용해 scss를 css로 변환해준다.
        // 여기서 중요한건 위에서 아래로 진행되는게 아니라 아래에서 위 순서로 진행된다.
        // 그렇기 때문에 scss - 호환성에 맞는 css변환 - css파일 생성까지 역순으로 간다.
        use: ExtractCSS.extract([
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [autoprefixer({ overridebrowserslist: 'cover 99.5%' })];
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ]),
      },
    ],
  },
  output: {
    path: OUTPUT_DIR,
    filename: '[name].js',
  },
  plugins: [new ExtractCSS('styles.css')],
};

module.exports = config;
