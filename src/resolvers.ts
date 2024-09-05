import Query from '../controller/Query/query.js';

//mutation daki resolvers ları birleştirme
import { resolvers as createProfileResolvers } from '../controller/mutation/createProfile.js';
import { resolver as deleteProfileResolver } from '../controller/mutation/deleteProfile.js';
import { resolver as sendMessageResolver } from '../controller/mutation/sendMessage.js';
import { resolvers as updateProfileResolvers } from '../controller/mutation/updateProfile.js';
const resolvers = {
    Query: {
        ...Query, // Query resolver'ını buraya ekliyoruz
    },
    Mutation: {
        ...createProfileResolvers.Mutation,
        ...deleteProfileResolver.Mutation,
        ...sendMessageResolver.Mutation,
        ...updateProfileResolvers.Mutation,
    }
};

export default resolvers;
