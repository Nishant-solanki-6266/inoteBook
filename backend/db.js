// const mongoose = require('mongoose')
// const mongoUri ='mongodb://127.0.0.1:27017/nishantbahi'
// const connectToMongo = () => {
//     mongoose.connect(mongoUri,  {
// }
// )
// console.log("succesfully connected");
// }
// module.exports = connectToMongo;
/* ............................................................................................. */

/* ye wale code me collbacks hai connect ke andr isliye support nhi kra ra  hai */
// const mongoose = require('mongoose')
// const mongoUri = "mongodb://localhost:27017/?readPreference=nearest&directConnection=true"
// const connectToMongo =async ()=> {
//    await mongoose.connect(mongoUri,(l)=>{

//         console.log("succesfully connected"+l);
//     }
// )
// }
// module.exports = connectToMongo;
/*.......................................................................................................... */
const mongoose=require('mongoose')

const mongoURI="mongodb://127.0.0.1:27017/inotebook"
 const connectToMongo=()=>{
    mongoose.connect(mongoURI,{})
    // yha aage hm then ka use collbacks lga kar kr skte hai
        console.log("connected to mongo db succesfully");
 }

module.exports=connectToMongo;