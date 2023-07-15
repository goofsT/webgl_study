const http=require('http')
const app=http.createServer((req,res)=>{
    console.log(req.url)
    console.log(req.method)
    req.setHeader("application/json;charset='utf-8'")
    res.end("hello你好啊")
})

app.listen(3000,()=>{
    console.log('server is running')
})