import Agent from '@/src/components/Agent';
import DisplayTechIcons from '@/src/components/DisplayTechIcons';
import { getInterviewById } from '@/src/lib/action';
import dbConnect from '@/src/lib/dbConnect';
import { getRandomInterviewCover } from '@/src/lib/utils';
import { getCurrentUser } from '@/src/models/User';
import { RouteParams } from '@/src/types';
import { ObjectId } from 'mongoose';
import Image from 'next/image';

import { redirect } from 'next/navigation';


//for generating the interview based on the userId

const page = async({params}: RouteParams) => {
    const {id} = await params;
    console.log("Interview ID" ,id);
    await dbConnect();
    const interview=await getInterviewById(id);
    const user= await getCurrentUser();
    if(!user) return null;
    console.log("the current user is",user);
    console.log("interview is:" ,interview);
    

    if(!interview) redirect('/');  //if no interview then redirect the user to the home page
  return (
    <div className="min-h-screen">
    <div className="flex flex-row gap-4 justify-center items-center ">
     <div className="flex flex-row gap-4 items-center max-sm:flex-col">
      <div className="flex flex-row gap-4 items-center">
        <Image src={getRandomInterviewCover()} alt="cover-mage" width={40} height={40} className="rounded-full object-cover size-10 ml-2"/>
        <h3 className="capitalize">{interview.role} Interview</h3>
      </div>
      <DisplayTechIcons techStack={interview.techstack}/>

     </div>
     <p className="bg-gray-600 px-4 py-2 rounded-lg h-fit capitalize">Type:{interview.type}</p>
    
    </div>
    <Agent

    userName={user?.name || ' '}
    userId={user?._id.toString()}
    interviewId={id}
    type="interview"
    questions={interview?.questions}

    />
    </div>
  )
}


export default page
