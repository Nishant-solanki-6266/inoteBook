// const connectToMongo=require('./db')
// const express=require("express")
// connectToMongo();
 
// const app=express();
// const port=3000;
// app.use(express.json())
// // Available Routes

// app.use('/api/auth',require('./routes/auth'))
// app.use('/api/notes',require('./routes/notes'))

// app.listen(port,()=>{
//     console.log(`exapmle app listening at http://localhost:${port}`);
// })
/*................................ */
const conntedtomongo=require('./db')
var cors=require('cors')
const express=require('express')
conntedtomongo();
const app=express();
const port=5000;
app.use(cors())
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port,()=>{
console.log(`example app listening at http://localhost:${port}`);
})

