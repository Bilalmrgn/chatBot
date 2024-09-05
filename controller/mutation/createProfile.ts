import { AiProfileModel, AiProfile } from "../../db/model.js";
import resetChatHistory from '../../chatGPT/ResetChatHistory.js'
import { Types } from "mongoose"; // Types'ı ekleyin

//create Ai Profile
export const resolvers = {
    Mutation: {
        createAiProfile: async(_: any,{name,avatar,persona}:any) => {
            try {
                //default veriler ile profil oluştur
                const defaultName = name || "Default aiProfile";
                const defaultAvatar = avatar || "https://example.com/avatar.png";
                const defaultPersona = persona || "default persona";
                const newProfile = new AiProfileModel({//mongoose kullanarak yeni bir aiProfileModel oluşturur(yani yeni profil oluşturma bu kısımda yapılır)
                    name,
                    avatar,
                    persona,
                    status:'ENABLED',//profilin sistem tarafından aktif olup olmayacağını belirtir. Eğer diabled yani aktifdeğil ise belirli işlemler uygulanamaz
                    createdAt: new Date(),//profilin oluşturulma zamanını temsil eder
                    updatedAt: new Date()
                });
                //profili veritabanına kaydet
                const result = await newProfile.save();
                const profileId = result._id as Types.ObjectId;

                resetChatHistory(profileId.toString());


                return result;
            } catch (error) {
                throw new Error("kullanıcı oluşturulamadı.");
            }
        }
    }
}