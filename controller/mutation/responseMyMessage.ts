import { AiProfileModel } from "../../db/model.js";

export default async function responseMyMessage(aiProfileId:any,message:any){
    const aiProfile = await AiProfileModel.findById(aiProfileId);
    let responseText;
    if(message === 'merhaba'){
        responseText = "Hoşgeldiniz. Nasıl yardımcı olabilirim?";
        return responseText;
    }
    else if(message === 'nasılsın'){
        responseText = 'sağlığınıza duacıyım sizler nasılsınız';
        return responseText;
    }
}