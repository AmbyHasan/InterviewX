
//kis type se hamara response dikhna chahiye

export interface ApiResponse{
    success:boolean;
    message:string;
    isAcceptingMessages? :boolean
    messages?:Array<Message> //for showing the messages to the users


}