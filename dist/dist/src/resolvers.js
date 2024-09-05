var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import Query from '../controller/Query/query.js';
//mutation daki resolvers ları birleştirme
import { resolvers as createProfileResolvers } from '../controller/mutation/createProfile.js';
import { resolver as deleteProfileResolver } from '../controller/mutation/deleteProfile.js';
import { resolver as sendMessageResolver } from '../controller/mutation/sendMessage.js';
import { resolvers as updateProfileResolvers } from '../controller/mutation/updateProfile.js';
var resolvers = {
    Query: __assign({}, Query),
    Mutation: __assign(__assign(__assign(__assign({}, createProfileResolvers.Mutation), deleteProfileResolver.Mutation), sendMessageResolver.Mutation), updateProfileResolvers.Mutation)
};
export default resolvers;
