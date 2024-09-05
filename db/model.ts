import mongoose from 'mongoose';
import {Document,Schema} from 'mongoose'


export interface AiProfile extends Document {
    status: 'ENABLED' | 'DISABLED';
    name: string;
    avatar?: string;
    persona?: string;
    onlyUseKnowledgeSources?: boolean;
    createdAt: Date;
    updatedAt: Date;
}
  
export interface AiKnowledgeSource extends Document {
    aiProfile: mongoose.Types.ObjectId;
    status: 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
    title: string;
    sourceType: 'URL' | 'PDF' | 'TEXT';
    source: string;
    createdAt: Date;
    updatedAt: Date;
  }


const AiProfileSchema: Schema = new Schema({
    status: { type: String, enum: ['ENABLED', 'DISABLED'], required: true },
    name: { type: String, required: true },
    avatar: { type: String },
    persona: { type: String },
    onlyUseKnowledgeSources: { type: Boolean },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// AiKnowledgeSource Schema
const AiKnowledgeSourceSchema: Schema = new Schema({
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


// AiSourceContent Interface
export interface AiSourceContent extends Document {
    aiKnowledgeSource: mongoose.Types.ObjectId;
    content: string;
    language: string;
    createdAt: Date;
  }
  
  // AiSourceContent Schema
  const AiSourceContentSchema = new mongoose.Schema({
    aiKnowledgeSource: { type: mongoose.Schema.Types.ObjectId, ref: 'AiKnowledgeSource', required: true },
    content: { type: String, required: true },
    language: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

  export interface Chat extends Document {
    aiProfile: mongoose.Types.ObjectId;
    messages: Array<{
        sender: 'USER' | 'AI';
        message: string;
        timestamp: Date;
    }>;
    createdAt: Date;
    updatedAt: Date;
}

// Chat şeması
const ChatSchema: Schema = new Schema({
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
const ChatModel = mongoose.model<Chat>('Chat', ChatSchema);

export { ChatModel };

const AiSourceContentModel = mongoose.model<AiSourceContent>('AiSourceContent', AiSourceContentSchema);

const AiProfileModel = mongoose.model<AiProfile>('AiProfile', AiProfileSchema);
const AiKnowledgeSourceModel = mongoose.model<AiKnowledgeSource>('AiKnowledgeSource', AiKnowledgeSourceSchema);

export { AiProfileModel, AiKnowledgeSourceModel, AiSourceContentModel };
