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

1. 首頁:使用gird網格系統排版，自動根據不同螢幕縮放
- ![homepageDisplay](https://user-images.githubusercontent.com/87023069/215299109-3c7ce363-6be6-413f-8643-542114c2e5bb.gif)

2. 導覽列(由左至右):
  - 首頁按鈕:回首頁，回到首頁會重新載入此頁
  - 搜尋列:根據輸入的字串搜尋，不過有個設計上的BUG，因為這功能比較晚寫，架構已經固定了，所以導致此功能只在首頁時才能使用，之後想寫成搜尋完會跳轉到新的一頁顯示商品
  - 購物車:根據雲端資料庫來顯示購物車的商品數量，也是轉向購物車頁面的按鈕
  - 會員中心:轉向會員中心的按鈕，也會根據是否登入顯示不同狀態
  - ![navBarDisplay](https://user-images.githubusercontent.com/87023069/215300041-2fd0316a-1946-4f2b-b253-d6c8ef7507d5.gif)

3. 會員中心頁面:連接後端與資料庫，做登入資料的驗證與註冊，登入完回首頁，未來有機會想寫一個我自己的後台系統頁面，以便我更新商品
  - 登入:根據帳號密碼登入，帳號錯誤會提醒註冊，密碼錯誤會提醒錯誤
  - 註冊:可以新增帳號密碼，後端寫進雲端資料庫
  - ![memberCenterDisplay](https://user-images.githubusercontent.com/87023069/215300348-97c5410d-387d-48e7-bcb7-b162a21a76f1.gif)

4. 產品頁面:連接後端資料庫，在前端渲染，有留言功能(不限登入與否)，加入購物車功能(需要登入會員)
  - 留言功能:能留下自己對產品的想法，之後可擴充為評價功能
  - 加入購物車:根據是否登入來執行動作，登入之後會加入購物車，之後會引導進購物車頁面!
  - ![productPageDisplay](https://user-images.githubusercontent.com/87023069/215300983-e6428ddf-befe-4cf0-8cdb-37445a58c8d8.gif)
