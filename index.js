let express= require('express')
let app=express();

let {routes}=require('./routes')

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(routes)

app.listen(3004,()=>{
    console.log("connectedddd")
})