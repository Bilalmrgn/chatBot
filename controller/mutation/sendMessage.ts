import chatGPTClient from "../../chatGPT/chatgptClient.js";
import { processPdfFiles } from "../../contentProcessor/pdfProcessor.js";
import { processUrl } from "../../contentProcessor/urlProcessor.js";
import { AiProfileModel } from "../../db/model.js";
import saveContentToDatabase from "../../db/saveContentToDatabase.js";
import responseMyMessage from "./responseMyMessage.js";

//mesaj gönderme ve chatgpt den yanıt alma
export const resolver = {
    Mutation: {
        sendMessage: async (_: any,{aiProfilesId,message}:any) =>{
            try {
                console.log('mutasyon tetiklendi. Veri: ' + message);
                const decodedMessage = decodeURIComponent(message);
               
                //responseMyMessage deki cevapları döndür
                const myResponse = await responseMyMessage(aiProfilesId,decodedMessage);
                if(myResponse){
                    return myResponse;
                }
                else{
                    const aiProfile = await AiProfileModel.findById(aiProfilesId);
                    if (!aiProfile) {
                        throw new Error("Kullanıcı bulunamadı");
                    }
                    //chatgpt ye sor
                    let response: string;
                    //mesajım pdf ise
                    if(decodedMessage.endsWith('.pdf')){
                        console.log("pdf dosyası : " + decodedMessage);
                        const pdfContent:any = await processPdfFiles(decodedMessage);
                        console.log("işlendi")
                        response = await chatGPTClient.getResponse(aiProfilesId, pdfContent);
                        await saveContentToDatabase(aiProfilesId,pdfContent.split('\n'),'PDF','PDF');

                        //mesajım http ise
                    }else if(decodedMessage.startsWith('http')){
                        const urlContent = await processUrl(decodedMessage);
                        if(urlContent){
                            response = await chatGPTClient.getResponse(aiProfilesId, urlContent.join(' '));//http yi birleştir
                            await saveContentToDatabase(aiProfilesId,urlContent,'url','URL');
                        }else{
                            response = 'URL içeriği bulunamadı.';
                        }
                    }
                    else{
                        response = await chatGPTClient.getResponse(aiProfilesId,decodedMessage);
                    }
                    console.log('ChatGPT yanıtı:', response);
                    return response;
                }
            } catch (error) {
                throw new Error('Failed to process the message');
            }
        }
    }
}


