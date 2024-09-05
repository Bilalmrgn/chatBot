//yeni sohbet oluşturduğumuzda yeni sohbet mesaj kısmı aç öncekileri temizle
import chatGPTClient from "../chatGPT/chatgptClient.js";
export default function resetChatHistory(profileId) {
    if (chatGPTClient.profiles.has(profileId)) {
        chatGPTClient.profiles.set(profileId, { chatHistory: [] });
    }
    else {
        chatGPTClient.profiles.set(profileId, { chatHistory: [] });
    }
    console.log("Sohbet ge\u00E7mi\u015Fi s\u0131f\u0131rland\u0131: ".concat(profileId));
}
