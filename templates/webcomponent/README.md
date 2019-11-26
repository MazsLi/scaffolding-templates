## README

### LOCAL TEST
1. iHost 綁定 127.0.0.1 local.test.com
2. local.test.com 為 webpack.config.js 内 devServer 所指定的 host
3. npm run start

如果發生錯誤: try reinstall node modules folder
1. rm -rf node_modules
2. npm i

### PUBLISH
1. npm run publish
從 package.json 可以看到 publish 是執行 ./scripts/publish2basement.js 這隻 JS
它的作用是把 build 下的編譯後的產物發布至雲端

### PROBLEM
1. 属性不能传 Object、Function(已解決請看utils-getReactAttribute)
props內React16.8fiber會將dom的 attribute 都放入 props.__reactEventHandlers內包含Object、function
任何通過react渲染得到的DOM樹中隨意選取一個節點都會有__reactEventHandlers這個屬性
在這個對象中我們可以找到在JSX中為這個標籤添加的事件屬性，也就是可以拿到onClick
2. 属性不能有大写
3. 不想打包進 webcomponent 的套件可以在 webpack.config.js 內 externals 去設定，但使用 webcomponent 的那個頁面必須引用