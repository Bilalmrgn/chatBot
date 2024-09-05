import dotenv from 'dotenv';
dotenv.config();

const chatGPTClient = {
    profiles: new Map<string, { chatHistory: { role: string, content: string }[] }>(),

    async getResponse(profileId: string, message: string) {
        try {
            const apiKey = process.env.OPEN_AI_KEY; // Bu anahtar artık tarayıcıya geçmez, sunucuda kalır
            if (!this.profiles.has(profileId)) {
                this.profiles.set(profileId, { chatHistory: [] });
            }

            const profileData = this.profiles.get(profileId);
            profileData?.chatHistory.push({ role: 'user', content: message });

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: profileData?.chatHistory,
                    temperature: 0.7,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const reply = data.choices[0].message.content.trim();
            profileData?.chatHistory.push({ role: 'assistant', content: reply });

            return reply;
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to get response from OpenAI API');
        }
    }
    
};

export default chatGPTClient;
