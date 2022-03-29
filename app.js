const express = require ('express')                        //載入框架:express
const app = express ()                                     
const port = 3000
const exphbs = require ('express-handlebars')               //載入套件:express-handlebars
const restaurantList = require ('./restaurant.json')        //載入餐廳資料:restaurant.json
const results = restaurantList.results



app.engine ('handlebars', exphbs ({ defaultLayout: 'main' }))   //設定樣板引擎,主頁面為'main'
app.set ( 'view engine', 'handlebars')                          //讀取副檔名為'handlebars'的樣板引擎

app.use ( express.static ('public'))                            //使用靜態檔案 

app.get ( '/', (req,res) => {                                   //取得首頁資料,渲染index
    res.render ( 'index', {restaurants: results})
})


//取得餐廳詳細資料,渲染show
app.get ( '/restaurants/:id', (req,res) => {                    //以id為「動態路由」的辨識依據
    // console.log ( 'req.query', req.query)
    const restaurantFind = results.find ( restaurant =>         //設定變數restaurantList.results,使用.find()
        restaurant.id.toString () === req.params.id             //.toString()將數字轉為字串,須與req.params.id相同
    )
    res.render ( 'show', { restaurant: restaurantFind})         //渲染show頁面
})


//search bar效果
app.get ( '/search', (req,res) => {                             
    // console.log ( 'req.query', req.query)
    const keyword =req.query.keyword                            //定義變數:keyword,關鍵字輸入後作為搜尋依據
    const restaurantFilter = results.filter ( restaurant => {   //.filter()過濾搜尋字串
        const text = [ restaurant.name, restaurant.category]    //設定搜尋範圍:[name、category]
        return text.some (                                      //.some():其1符合條件即回傳
            text => text.toLowerCase ().includes ( keyword.toLowerCase()))        
    })          //.toLowerCase:小寫字體也包含
    res.render ( 'index', { restaurants: restaurantFilter, keyword:keyword})  // 渲染index,顯示搜尋結果,keyword保留在search bar              
})                                                                            


//啟用、監聽伺服器
app.listen ( port, () => {
    console.log (`localhost:${port}`)
})