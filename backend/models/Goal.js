const goalSchema = new mongoose.Schema({
 userId:String,
 goalType:String,
 target:Number,
 current:Number
});