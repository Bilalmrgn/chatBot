"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
//mutation daki resolvers ları birleştirme
var createProfile_js_1 = require("../controller/mutation/createProfile.js");
var deleteProfile_js_1 = require("../controller/mutation/deleteProfile.js");
var sendMessage_js_1 = require("../controller/mutation/sendMessage.js");
var updateProfile_js_1 = require("../controller/mutation/updateProfile.js");
var resolvers = {
    Query: __assign({}, Query.Query),
    Mutation: __assign(__assign(__assign(__assign({}, createProfile_js_1.resolvers.Mutation), deleteProfile_js_1.resolver.Mutation), sendMessage_js_1.resolver.Mutation), updateProfile_js_1.resolvers.Mutation)
};
exports.default = resolvers;
