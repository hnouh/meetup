var mongoose = require("mongoose"); 
var Schema = mongoose.Schema;

//Grocery Schema
var grocerySchema = new Schema(
    { 
    name: { type: String, required: [true, "can't be blank"] }, 
    supermarket: {type: String}, 
    quantity:{type:Number,default:1},
    image:{type:String},
    done:{type: Boolean,default:false},
    }, {timestamps:true}
)

var Grocery = mongoose.model("Grocery", grocerySchema ); 
//Export Models
module.exports = Grocery; 
