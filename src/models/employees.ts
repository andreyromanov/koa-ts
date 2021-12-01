import * as mongoose from "mongoose"

const EmployeeSchema = new mongoose.Schema({
    username : {type:String, required:true, unique:true},
    email    : {type:String, required:true, unique:true}
},
{
   timestamps : true 
}
)
export default mongoose.model('Employee', EmployeeSchema);