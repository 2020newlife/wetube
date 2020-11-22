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
});

const model = mongoose.model('Comment', CommentSchema);

export default model;
