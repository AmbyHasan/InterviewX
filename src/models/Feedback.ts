import mongoose ,{Document ,Schema} from 'mongoose';
import {  FeedbackType } from '../types';
import { Category } from '../types';



//now first of all we will define the model for category
//in a feedback we will have five categories

const CategorySchema : Schema<Category>= new Schema({
  name:{
    type:String,
    enum:["Communication Skills" ,"Technical Knowledge","Problem Solving", "Cultural Fit", "Confidence and Clarity"],
    required:true
       },

  score:{
    type:Number,
    required:true
  } ,
  comment:{
    type:String , 
    required:true
  },
} ,{ _id:false} //as we do not want id inside arrays)
);


const FeedbackSchema: Schema<FeedbackType>=new Schema({
  interviewId:{
    type:String , 
    required:true
  },
  userId:{
    type:String , 
    required:true
  },
  totalScore:{
    type:Number ,
    required:true
  } ,

  categoryScores:{
    type:[CategorySchema],
    validate:{
      validator :(arr:any[]) => arr.length===5,
      message : "categoryScores must contain five items only"
    },
    required:true
  } ,

  strengths:{   //as it will have array of strings
    type:[String] , 
    required:true
  },

  areasForImprovement:{
    type:[String] ,
    required:true
  },
  finalAssessment:{
    type:String , 
    required:true
  }
} ,{timestamps:true}); 

export default mongoose.models.FeedBack || mongoose.model("FeedBack" , FeedbackSchema);