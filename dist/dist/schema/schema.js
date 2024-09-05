var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", { value: raw });
    }
    else {
        cooked.raw = raw;
    }
    return cooked;
};
import { gql } from 'apollo-server';
export var typeDefs = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\nenum AiProfileStatus {\n  ENABLED\n  DISABLED\n}\n\nenum AiKnowledgeSourceStatus {\n    ENABLED\n    DISABLED\n}\n\nenum AiKnowledgeSourceType {\n  URL\n  FILE\n}\n\ntype Query {\n  aiProfiles: [AiProfile] # T\u00FCm AI profillerini getirir\n  aiKnowledgeSources(aiProfilesId: ID!): [AiKnowledgeSource]\n  aiSourceContents(aiKnowledgeSourceId: ID!): [AiSourceContent] # Belirli bir bilgi kayna\u011F\u0131 i\u00E7in i\u00E7erikleri getirir\n}\n\n# AI Profil tipi\ntype AiProfile {\n  id: ID! # Profilin benzersiz kimli\u011Fi\n  status: AiProfileStatus # Profilin durumu\n  name: String # Profil ad\u0131\n  avatar: String # Profil resmi URL'si\n  persona: String # Profil ki\u015Fili\u011Fi\n  onlyUseKnowledgeSources: Boolean # Bilgi kaynaklar\u0131n\u0131 sadece kullanma durumu\n  createdAt: String # Olu\u015Fturulma tarihi\n  updatedAt: String # G\u00FCncellenme tarihi\n}\n\n# AI Bilgi Kayna\u011F\u0131 tipi\ntype AiKnowledgeSource {\n  id: ID! # Bilgi kayna\u011F\u0131n\u0131n benzersiz kimli\u011Fi\n  aiProfile: ID! # \u0130li\u015Fkili AI profilinin kimli\u011Fi\n  status: AiKnowledgeSourceStatus # Bilgi kayna\u011F\u0131n\u0131n durumu\n  title: String # Bilgi kayna\u011F\u0131n\u0131n ba\u015Fl\u0131\u011F\u0131\n  sourceType: AiKnowledgeSourceType # Bilgi kayna\u011F\u0131n\u0131n t\u00FCr\u00FC\n  source: String # Bilgi kayna\u011F\u0131n\u0131n URL veya yolu\n  createdAt: String # Olu\u015Fturulma tarihi\n  updatedAt: String # G\u00FCncellenme tarihi\n}\n\n# AI Kaynak \u0130\u00E7eri\u011Fi tipi\ntype AiSourceContent {\n  id: ID! # \u0130\u00E7eri\u011Fin benzersiz kimli\u011Fi\n  aiProfile: ID! # \u0130li\u015Fkili AI profilinin kimli\u011Fi\n  aiKnowledgeSource: ID! # \u0130li\u015Fkili bilgi kayna\u011F\u0131n\u0131n kimli\u011Fi\n  content: String # \u0130\u00E7erik metni\n  language: String # \u0130\u00E7eri\u011Fin dili\n  createdAt: String # Olu\u015Fturulma tarihi\n  updatedAt: String # G\u00FCncellenme tarihi\n}\n\ntype Mutation {\n  createAiProfile(name: String!, avatar: String, persona: String, onlyUseKnowledgeSources: Boolean): AiProfile\n  updateAiProfile(id: ID!, name: String, avatar: String, persona: String): AiProfile\n  deleteAiProfile(id: ID!): Boolean\n  sendMessage(aiProfilesId: ID!,message:String!): String!\n  # Yeni profil olu\u015Ftur ve sohbet ge\u00E7mi\u015Fini s\u0131f\u0131rla\n  resetHistory(profileId: ID!): AiProfile\n}\n"], ["\n\nenum AiProfileStatus {\n  ENABLED\n  DISABLED\n}\n\nenum AiKnowledgeSourceStatus {\n    ENABLED\n    DISABLED\n}\n\nenum AiKnowledgeSourceType {\n  URL\n  FILE\n}\n\ntype Query {\n  aiProfiles: [AiProfile] # T\u00FCm AI profillerini getirir\n  aiKnowledgeSources(aiProfilesId: ID!): [AiKnowledgeSource]\n  aiSourceContents(aiKnowledgeSourceId: ID!): [AiSourceContent] # Belirli bir bilgi kayna\u011F\u0131 i\u00E7in i\u00E7erikleri getirir\n}\n\n# AI Profil tipi\ntype AiProfile {\n  id: ID! # Profilin benzersiz kimli\u011Fi\n  status: AiProfileStatus # Profilin durumu\n  name: String # Profil ad\u0131\n  avatar: String # Profil resmi URL'si\n  persona: String # Profil ki\u015Fili\u011Fi\n  onlyUseKnowledgeSources: Boolean # Bilgi kaynaklar\u0131n\u0131 sadece kullanma durumu\n  createdAt: String # Olu\u015Fturulma tarihi\n  updatedAt: String # G\u00FCncellenme tarihi\n}\n\n# AI Bilgi Kayna\u011F\u0131 tipi\ntype AiKnowledgeSource {\n  id: ID! # Bilgi kayna\u011F\u0131n\u0131n benzersiz kimli\u011Fi\n  aiProfile: ID! # \u0130li\u015Fkili AI profilinin kimli\u011Fi\n  status: AiKnowledgeSourceStatus # Bilgi kayna\u011F\u0131n\u0131n durumu\n  title: String # Bilgi kayna\u011F\u0131n\u0131n ba\u015Fl\u0131\u011F\u0131\n  sourceType: AiKnowledgeSourceType # Bilgi kayna\u011F\u0131n\u0131n t\u00FCr\u00FC\n  source: String # Bilgi kayna\u011F\u0131n\u0131n URL veya yolu\n  createdAt: String # Olu\u015Fturulma tarihi\n  updatedAt: String # G\u00FCncellenme tarihi\n}\n\n# AI Kaynak \u0130\u00E7eri\u011Fi tipi\ntype AiSourceContent {\n  id: ID! # \u0130\u00E7eri\u011Fin benzersiz kimli\u011Fi\n  aiProfile: ID! # \u0130li\u015Fkili AI profilinin kimli\u011Fi\n  aiKnowledgeSource: ID! # \u0130li\u015Fkili bilgi kayna\u011F\u0131n\u0131n kimli\u011Fi\n  content: String # \u0130\u00E7erik metni\n  language: String # \u0130\u00E7eri\u011Fin dili\n  createdAt: String # Olu\u015Fturulma tarihi\n  updatedAt: String # G\u00FCncellenme tarihi\n}\n\ntype Mutation {\n  createAiProfile(name: String!, avatar: String, persona: String, onlyUseKnowledgeSources: Boolean): AiProfile\n  updateAiProfile(id: ID!, name: String, avatar: String, persona: String): AiProfile\n  deleteAiProfile(id: ID!): Boolean\n  sendMessage(aiProfilesId: ID!,message:String!): String!\n  # Yeni profil olu\u015Ftur ve sohbet ge\u00E7mi\u015Fini s\u0131f\u0131rla\n  resetHistory(profileId: ID!): AiProfile\n}\n"])));
export default typeDefs;
var templateObject_1;
