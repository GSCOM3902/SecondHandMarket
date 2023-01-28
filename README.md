# SecondHandMarket

## 作品簡介

這是一份個人二手商品的線上商城作品，希望能透過這個作品，練習電商平台前後端的邏輯，
功能可能不多，但最主要的是練習以現有技術搭建平台，之後有機會了話，也可以擴充功能，
甚至是丟上網域，真的經營個人的二手市集!

## 使用技術
前端JS:
1. React.js:建立前端框架
2. redux,react-redux:中央狀態管理與連接React
3. react-router-dom:前端路由處理
4. axios:使用axios建立http請求
5. restful API 設計:節省後端計算資源
6. session:利用session紀錄狀態，以免重新刷新頁面便遺失狀態

前端CSS:
1. 手刻RWD(斷點一個820px而已，主要是練習rwd的CSS擺放，JS也根據不同版有不同功能)
2. flex與grid


後端NodeJS:
1. express:建立後端框架
2. mongoose:用來連接雲端的MongoDB資料庫
3. restful API:可根據不同http請求實施

## 安裝流程

這專案使用 [git](https://git-scm.com),[node](http://nodejs.org)和[npm](https://npmjs.com). 請先安裝他們在本地檔案

1. 先從github下在檔案

```sh
$ git clone https://github.com/GSCOM3902/SecondHandMarket.git
```

2. 移動到該資料夾，安裝程式需要之package

```sh
$ cd .\SecondHandMarket
$ npm install
```
3. 因為react-script不知道為甚麼需要重灌，因此要往下資料夾移動並重灌

```sh
$ cd .\client
$ npm install react-script
```
4. 安裝完成後回到上層資料夾，就能開始使用了

```sh
$ cd ..\
```

## 使用流程

在該資料夾輸入

```sh
$ npm run dev
```
即可開始體驗網頁!

## 網頁功能概介
