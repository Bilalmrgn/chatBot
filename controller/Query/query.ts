import { AiProfileModel } from '../../db/model.js';

const Query = {
    aiProfiles: async () => {
        try {
            const profiles = await AiProfileModel.find();
            console.log('Profiles:', profiles);
            return profiles;
        } catch (error) {
            throw new Error('Profilleri getirirken bir hata oluştu');
        }
    }
};

export default Query;
