import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  faceBookId: Number,
  githubId: Number,
  naverId: Number,
  kakaoId: Number,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comment',
    },
  ],
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'video',
    },
  ],
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const model = mongoose.model('User', UserSchema);

export default model;
