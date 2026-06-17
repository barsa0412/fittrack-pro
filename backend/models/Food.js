const foodSchema = new mongoose.Schema({
 userId:String,
 name:String,
 calories:Number,
 protein:Number,
 carbs:Number,
 fat:Number,
 mealType:String
});