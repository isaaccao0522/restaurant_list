const express = require ('express')                         //使用express
const app = express ()                                      //app.js採用express驅動
const port = 3000
const exphbs = require ('express-handlebars')               //使用express-handlebars
const restaurantList = require ('./restaurant.json')        //使用'restaurant.json'
const results = restaurantList.results



app.engine ('handlebars', exphbs ({ defaultLayout: 'main' }))   //設定樣板引擎,主頁面為'main'
app.set ( 'view engine', 'handlebars')                          //讀取副檔名為'handlebars'的樣板引擎

app.use ( express.static ('public'))                            //使用靜態檔案 

app.get ( '/', (req,res) => {                                   //取得首頁資料,渲染index
    res.render ( 'index', {restaurants: results})
})

app.get ( '/restaurants/:id', (req,res) => {                    //取得餐廳詳細資料,渲染show
    // console.log ( 'req.query', req.query)
    const restaurantFind = results.find ( restaurant =>         //以id以id
        restaurant.id.toString () === req.params.id
    )
    res.render ( 'show', { restaurant: restaurantFind})
})

app.get ( '/search', (req,res) => {
    // console.log ( 'req.query', req.query)
    const keyword =req.query.keyword
    const restaurantFilter = results.filter ( restaurant => {
        const text = [ restaurant.name, restaurant.category]
        return text.some (
            text => text.toLowerCase ().includes ( keyword.toLocaleLowerCase()))        
    })
    res.render ( 'index', { restaurants: restaurantFilter, keyword:keyword})
})

app.listen ( port, () => {
    console.log (`localhost:${port}`)
})