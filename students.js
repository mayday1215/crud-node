const fs = require("fs")
const basePath = "./"
//请求首页数据操作
exports.findAll = (callback) => {
  fs.readFile(basePath+"bd.json",'utf-8',(err,data) => {
    if(err){
      callback(err)
      return
    }
    callback(null,data)
  })
}

//添加学生
exports.save = (students,callback) => {
  console.log('添加开始')
  fs.readFile(basePath+"bd.json",'utf-8',(err,data) => {
    if(err){
      callback(err)
      return
    }
    let stuArr = JSON.parse(data).students
    students.id = stuArr[stuArr.length - 1].id + 1
    stuArr.push(students)
    stuArr
    let stuObj = {
      "students":stuArr
    }
    let stuArrJson = JSON.stringify(stuObj)
    console.log(stuObj)
    console.log('添加些之前')
    fs.writeFile(basePath+"bd.json",stuArrJson,(err) => {
      if(err){
        callback(err)
        return 
      }
      callback(err)
    })
    // console.log(arr)
  })
}

//查找id学生
exports.getByIdStudent = (id,callback) => {
  fs.readFile(basePath+"bd.json",'utf-8',(err,data) => {
    if(err){
      callback(err)
      return
    }
    
    // const sid = parseInt(id)
    
    let stuArr = JSON.parse(data).students
    let stuObj = stuArr.find(item => {
      return item.id == id
    })
    callback(null,stuObj)
  })
}


//编辑后保存学生
exports.saveUpdate = (stu,callback) => {
  // console.log(stu)
  fs.readFile(basePath+"bd.json",'utf-8',(err,data) => {
    if(err){
      callback(err)
      return
    }

    let stuArr = JSON.parse(data).students
    let stuObj = stuArr.find(item => {
      if(stu.id == item.id){
        for(let key in stu){
          item[key] = stu[key]
        }
      }
    })
    let studentsObj = {
      students:stuArr
    }
    let stusJson = JSON.stringify(studentsObj)
    fs.writeFile(basePath+"bd.json",stusJson,err => {
      if(err){
        callback(err)
        return
      }
      callback(null)
    })
    
  })
}

//根据id删学生
exports.del = (id,callback) => {
  fs.readFile(basePath+"bd.json",'utf-8',(err,data) => {
    if(err){
      callback(err)
      return
    }
    let stuArr = JSON.parse(data).students
    stuArr.some((item,index) => {
      if(item.id == id){
        stuArr.splice(index,1)
      }
      return item.id == id
    })
    let studentsObj = {
      students:stuArr
    }
    let studJson = JSON.stringify(studentsObj)
    fs.writeFile("./bd.json",studJson,(err) => {
      if(err){
        callback(err)
        return
      }
      callback(null)
    })


    
    
   

 
    
  })
}



