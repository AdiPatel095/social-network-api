// src/models/Thought.ts
import { Schema, model, Document, Types } from 'mongoose';
import formatDate from '../utils/dateFormat';

export interface IReaction {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: String;
}

export interface IThought extends Document {
  thoughtText: string;
  createdAt: String;
  username: string;
  reactions: IReaction[];
  reactionCount: number;
}

const reactionSchema = new Schema<IReaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
      // Use our custom date formatter
      get: (date: any) => formatDate(date),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
      get: (date: any) => formatDate(date),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Virtual to count reactions
thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
  return this.reactions.length;
});

const Thought = model<IThought>('Thought', thoughtSchema);
export default Thought;
