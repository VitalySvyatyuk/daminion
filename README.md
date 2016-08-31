npm init -y

npm i -S react react-dom

npm i -D babel-core babel-loader babel-preset-es2015 babel-preset-react react-hot-loader webpack webpack-dev-server

Для RadioGroup: npm i -D react-radio-group

sudo npm i -g webpack webpack-dev-server

touch webpack.config.js - and fill this config

in html include:

    <div id="app" />
    <script src="bundle.js"></script>

mkdir src

"bundle.js" не видно среди файлов, но он есть при загрузке


Для запуска пишем в командной строке: webpack-dev-server
Далле - заходим по адресу http://127.0.0.1:8080
