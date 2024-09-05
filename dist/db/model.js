import mongoose from 'mongoose';
import { Schema } from 'mongoose';
var AiProfileSchema = new Schema({
    status: { type: String, enum: ['ENABLED', 'DISABLED'], required: true },
    name: { type: String, required: true },
    avatar: { type: String },
    persona: { type: String },
    onlyUseKnowledgeSources: { type: Boolean },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
// AiKnowledgeSource Schema
var AiKnowledgeSourceSchema = new Schema({
    aiProfile: {
        type: Schema.Types.ObjectId,
        ref: 'AiProfile',
        required: true
    },
    status: {
        type: String,
        enum: ['IN_PROGRESS', 'COMPLETED', 'FAILED'],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    sourceType: {
        type: String,
        enum: ['URL', 'PDF', 'TEXT'],
        required: true
    },
    source: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});
// AiSourceContent Schema
var AiSourceContentSchema = new mongoose.Schema({
    aiKnowledgeSource: { type: mongoose.Schema.Types.ObjectId, ref: 'AiKnowledgeSource', required: true },
    content: { type: String, required: true },
    language: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
// Chat şeması
var ChatSchema = new Schema({
    aiProfile: {
        type: Schema.Types.ObjectId,
        ref: 'AiProfile',
        required: true
    },
    messages: [{
            sender: {
                type: String,
                enum: ['USER', 'AI'],
                required: true
            },
            message: {
                type: String,
                required: true
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});
// Chat modelini oluştur
var ChatModel = mongoose.model('Chat', ChatSchema);
export { ChatModel };
var AiSourceContentModel = mongoose.model('AiSourceContent', AiSourceContentSchema);
var AiProfileModel = mongoose.model('AiProfile', AiProfileSchema);
var AiKnowledgeSourceModel = mongoose.model('AiKnowledgeSource', AiKnowledgeSourceSchema);
export { AiProfileModel, AiKnowledgeSourceModel, AiSourceContentModel };
