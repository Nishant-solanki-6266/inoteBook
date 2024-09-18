const mongoose=require('mongoose')
const {Schema}=mongoose;
const UserSchema=new Schema({
    name:{
        type:String,
        required:true,
        // require ka aasli mtlb (name) hona chahiye nhi hoga to error hi milega
    },
    email:{
        type:String,
        required:true,
        unique:true
        // unique ka aasli mtln hai ki( email) unique hina chahiye dubble nhi hona
    },
    password:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now
    },
}
// },{collation:'babajikibuti'}
)
const User=mongoose.model('usern',UserSchema);
// User.createIndexes();
module.exports=User;
//  mongoose
/////////////////////////////////////////////
