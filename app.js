const express = require("express")


const app = express()

const bodyParser = require("body-parser")
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
const router = require("./routers")

app.use(router)

//导入模板
app.engine('html', require('express-art-template'))

app.use("/node_modules/",express.static("./node_modules"))







app.listen(3000,() => {
  console.log('服务启动成功,请访问http://127.0.0.1:3000')
})