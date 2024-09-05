//yeni sohbet oluşturduğumuzda yeni sohbet mesaj kısmı aç öncekileri temizle

import chatGPTClient from "../chatGPT/chatgptClient.js";

export default function resetChatHistory(profileId: string) {
    if (chatGPTClient.profiles.has(profileId)) {
        chatGPTClient.profiles.set(profileId, { chatHistory: [] });
    } else {
        chatGPTClient.profiles.set(profileId, { chatHistory: [] });
    }
    console.log(`Sohbet geçmişi sıfırlandı: ${profileId}`);
}
