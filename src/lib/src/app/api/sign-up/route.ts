import dbConnect from "@/src/lib/dbConnect";
import UserModel from "@/src/models/User";
import bcrypt from "bcryptjs";


export async function POST(request:Request){

    await dbConnect();

    const{name ,email  ,password}= await request.json();

    //now check if the user with this email already exists
     const normalizedEmail = email.toLowerCase().trim();

    const existingUser= await UserModel.findOne({email:normalizedEmail});

    if(existingUser){
        return Response.json({
                success:false ,
                message:"User with this email already exists"
             } ,{status : 400})
    }
        //hash the password send by the user
        const hashedPassword=await  bcrypt.hash(password ,10);
        
        const newUser=await UserModel.create({
            name ,
            email ,
            password:hashedPassword
        })

        //save the user
            await newUser.save();

            return Response.json({
                success:true ,
                message:"User registered successfully"
            } ,{status:200})
    
}


