import { gql } from 'apollo-server';

export const typeDefs = gql`

enum AiProfileStatus {
  ENABLED
  DISABLED
}

enum AiKnowledgeSourceStatus {
    ENABLED
    DISABLED
}

enum AiKnowledgeSourceType {
  URL
  FILE
}

type Query {
  aiProfiles: [AiProfile] # Tüm AI profillerini getirir
  aiKnowledgeSources(aiProfilesId: ID!): [AiKnowledgeSource]
  aiSourceContents(aiKnowledgeSourceId: ID!): [AiSourceContent] # Belirli bir bilgi kaynağı için içerikleri getirir
}

# AI Profil tipi
type AiProfile {
  id: ID! # Profilin benzersiz kimliği
  status: AiProfileStatus # Profilin durumu
  name: String # Profil adı
  avatar: String # Profil resmi URL'si
  persona: String # Profil kişiliği
  onlyUseKnowledgeSources: Boolean # Bilgi kaynaklarını sadece kullanma durumu
  createdAt: String # Oluşturulma tarihi
  updatedAt: String # Güncellenme tarihi
}

# AI Bilgi Kaynağı tipi
type AiKnowledgeSource {
  id: ID! # Bilgi kaynağının benzersiz kimliği
  aiProfile: ID! # İlişkili AI profilinin kimliği
  status: AiKnowledgeSourceStatus # Bilgi kaynağının durumu
  title: String # Bilgi kaynağının başlığı
  sourceType: AiKnowledgeSourceType # Bilgi kaynağının türü
  source: String # Bilgi kaynağının URL veya yolu
  createdAt: String # Oluşturulma tarihi
  updatedAt: String # Güncellenme tarihi
}

# AI Kaynak İçeriği tipi
type AiSourceContent {
  id: ID! # İçeriğin benzersiz kimliği
  aiProfile: ID! # İlişkili AI profilinin kimliği
  aiKnowledgeSource: ID! # İlişkili bilgi kaynağının kimliği
  content: String # İçerik metni
  language: String # İçeriğin dili
  createdAt: String # Oluşturulma tarihi
  updatedAt: String # Güncellenme tarihi
}

type Mutation {
  createAiProfile(name: String!, avatar: String, persona: String, onlyUseKnowledgeSources: Boolean): AiProfile
  updateAiProfile(id: ID!, name: String, avatar: String, persona: String): AiProfile
  deleteAiProfile(id: ID!): Boolean
  sendMessage(aiProfilesId: ID!,message:String!): String!
  # Yeni profil oluştur ve sohbet geçmişini sıfırla
  resetHistory(profileId: ID!): AiProfile
}
`
export default typeDefs;


