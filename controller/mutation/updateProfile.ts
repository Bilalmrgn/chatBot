import { AiProfileModel } from "../../db/model.js";

//ai profile güncelleme
export const resolvers = {
    Mutation: {
        updateAiProfile: async (_:any,{id,name,persona}:any)=>{
            console.log('veri');
            try {
                const updateProfile = await AiProfileModel.findByIdAndUpdate(
                    {_id:id},//isme göre arama yapılırsa {name: "x"} şeklinde yazılır. mongodb de id: _id şeklinde tutulur
                    {
                        name,
                        
                        persona
                    },
                    {new:true}//güncellenmiş belgeyi geri döndür
                );
                if(!updateProfile){
                    throw new Error("Kullanıcı bulunamadı.");
                }
                const result = await updateProfile.save();
                return result;
            } catch (error) {
                throw new Error("Kullanıcı güncellenemedi.");
            }
        }
    }
}