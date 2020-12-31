import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: '파일의 경로를 찾을 수가 없습니다.',
  },
  title: {
    type: String,
    required: '영상의 제목을 입력하지 않았습니다.',
  },
  description: String,
  views: {
    type: Number,
    default: 0,
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

const model = mongoose.model('Video', VideoSchema);

export default model;
