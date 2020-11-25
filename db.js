import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

const dbConnectionSuccessFn = () => console.log('DB연결에 성공했습니다.');
const dbConnectionFailFn = error =>
  console.log(`DB연결에 실패했습니다. ${error}`);

db.once('open', dbConnectionSuccessFn);
db.on('error', dbConnectionFailFn);

// export const videos = [
//   {
//     id: 33333,
//     title: 'test Video1',
//     description: 'DB를 테스트하기 위해 넣은 더미 데이터 1',
//     views: 33,
//     videoFile:
//       'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4',
//     creator: {
//       id: 33333,
//       name: 'fkfkfk9',
//       email: '1234@abc.com',
//     },
//   },
//   {
//     id: 33334,
//     title: 'test Video2',
//     description: 'DB를 테스트하기 위해 넣은 더미 데이터 2',
//     views: 33,
//     videoFile:
//       'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4',
//     creator: {
//       id: 33333,
//       name: 'fkfkfk9',
//       email: '1234@abc.com',
//     },
//   },
//   {
//     id: 33335,
//     title: 'test Video3',
//     description: 'DB를 테스트하기 위해 넣은 더미 데이터 3',
//     views: 33,
//     videoFile:
//       'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4',
//     creator: {
//       id: 33333,
//       name: 'fkfkfk9',
//       email: '1234@abc.com',
//     },
//   },
//   {
//     id: 33336,
//     title: 'test Video4',
//     description: 'DB를 테스트하기 위해 넣은 더미 데이터 4',
//     views: 33,
//     videoFile:
//       'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4',
//     creator: {
//       id: 33333,
//       name: 'fkfkfk9',
//       email: '1234@abc.com',
//     },
//   },
//   {
//     id: 33337,
//     title: 'test Video5',
//     description: 'DB를 테스트하기 위해 넣은 더미 데이터 5',
//     views: 33,
//     videoFile:
//       'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4',
//     creator: {
//       id: 33333,
//       name: 'fkfkfk9',
//       email: '1234@abc.com',
//     },
//   },
// ];
