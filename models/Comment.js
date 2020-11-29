import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: '내용을 입력하지 않았습니다.',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: 'Creator is required',
  },
});

const model = mongoose.model('Comment', CommentSchema);

export default model;
