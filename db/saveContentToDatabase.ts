import mongoose from "mongoose";
import { AiKnowledgeSourceModel, AiSourceContentModel } from "./model.js";


//mesajları veritabanına kaydet
export default async function saveContentToDatabase(profileId: mongoose.Types.ObjectId, contentArray: string[], language: string, sourceType: string){
    try {
        try {
            //veritabanında aynı profil ve kaynağa sahip bir aiknowledgeSource kaydı olup olmadığını kontrol et
            let knowledgeSource = await AiKnowledgeSourceModel.findOne({aiProfile:profileId,sourceType:sourceType});
            knowledgeSource
                knowledgeSource = new AiKnowledgeSourceModel({
                    aiProfile: profileId,
                    status: 'COMPLETED',
                    title: 'Uploaded Content',
                    sourceType: sourceType,
                    source: 'N/A'
                });
                await knowledgeSource.save();
            //içerik kaydetme
            for (const content of contentArray) {
                console.log('Kaydedilecek içerik:', content); // İçeriğin ne olduğunu kontrol edin
                const sourceContent = new AiSourceContentModel({
                    aiKnowledgeSource: knowledgeSource._id,
                    content: content,
                    language: language,
                });
                await sourceContent.save();
                console.log('Source Content saved:', sourceContent);
            }
        } catch (error) {
            throw new Error('Failed to save content to the database');
        }
    } catch (error) {
        console.error('Error in saveContentToDatabase:', error);
        throw new Error('Failed to save content to the database');
    }
}