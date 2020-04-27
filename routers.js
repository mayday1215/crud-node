const express = require("express")

const router = express.Router()




const Students = require("./students")



router.get("/",(req,res) => {
  res.redirect("/students")
})
// 首页数据加载
router.get("/students",(req,res) => {
  Students.findAll((err,data) => {
    if(err){
      res.status(500).send("出问题啦....")
      return
    }
    const students = JSON.parse(data).students
    res.render("index.html",{
      students:students
    })
  })
})

// 跳转到添加学生页面
router.get("/students/add",(req,res) => {
  res.render("add.html")
})

// 保存添加学生
router.post("/students/add",(req,res) => {
  // Students.save(req.body)
  Students.save(req.body,err => {
    if(err){
      res.status(500).send("出问题啦...")
      return
    }
    res.redirect("/students")
  })
  
})

//到编辑页面
router.get("/students/edit",(req,res) => {
 
  Students.getByIdStudent(req.query.id,(err,data) =>{
    if(err){
      res.status(500).send("出问题啦...")
      return
    }
    console.log(data)
    res.render("edit.html",{
      stuObj:data
    })
  })
})

//编辑页面保存
router.post("/students/edit",(req,res) => {
  Students.saveUpdate(req.body,err => {
    if(err){
      res.status(500).send("出问题啦...")
      return
    }
    res.redirect("/students")
  })
})

//删除
router.get("/students/del",(req,res) => {
  Students.del(req.query.id,(err) => {
    if(err){
      res.status(500).send("出问题啦....")
      return
    }
    res.redirect("/students")
  })
})


module.exports = router
