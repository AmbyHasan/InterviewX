import mongoose ,{Schema , Document } from "mongoose";


export interface User extends Document{
     name:string ;
     email :string ;
     password?: string; //github and google wont supply a password
     id:string;
createdAt: Date;
  updatedAt: Date;
     
}

const UserSchema : Schema<User>=new mongoose.Schema({
    name:{
        type: String ,
        required:true,
        trim:true,
    } ,
    email:{
        type: String , 
        unique:true ,
        required:true,
         match:[ /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/ , "Please enter a valid email"]
    } ,
    password:{
        type:String ,
        required:false 
    }
} , {timestamps:true})


//next js ko ye nhi pata hota ki ye meri application first time run ho rhi hai ya pehle se boot up hochuki hai
//isiliye while creating UserModel we will first check ki kya ye pehle se bana hua hai  ?? otherwise bana do 

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema));

//here above in the first paranthesis we are checking either the User model is already created in db 
export default UserModel;