const mongoose=require("mongoose");
const questionSchema=new mongoose.Schema({
    question:{
        type:String,
        required:[true,'question cannot be empty'],
    },
    answer:{
        type:String,
        required:[true,"answer cannot be empty"]
    }
});


const Question=mongoose.model("Question",questionSchema);

module.exports=Question;