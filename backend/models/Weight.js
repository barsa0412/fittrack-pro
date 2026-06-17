const weightSchema = new mongoose.Schema({
 userId:String,
 weight:Number,
 date:{
  type:Date,
  default:Date.now
 }
});