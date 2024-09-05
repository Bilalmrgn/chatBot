import { AiProfileModel } from "../../db/model.js";



//profil silme
export const resolver = {
    Mutation: {
        deleteAiProfile: async (_: any, { id }: any) => {
            try {
                const result = await AiProfileModel.findByIdAndDelete(id);
                if(!result){
                    throw new Error("Kullanıcı bulunamadı.");
                }
                return true;
            } catch (error) {
                throw new Error("Kullanıcı silinemedi.");
            }
        }
    }
}