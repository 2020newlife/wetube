import routes from '../routes';
import Video from '../models/Video';
import Comment from '../models/Comment';
import User from '../models/User';

export const postAddComment = async (req, res) => {
  const {
    body: { videoId, comment },
    user,
  } = req;
  try {
    const newComment = await Comment.create({
      comment,
      creatorId: user.id,
      videoId,
    });

    console.log('newcomment 값:', newComment);

    res.status(200);
    res.end();
    // res.redirect(routes.video_detail(videoId));
    // res.send({ commentId: newComment.id });
  } catch (error) {
    res.status(400);
    res.end();
  }
};

export const postDeleteComment = async (req, res) => {
  const {
    body: { commentId },
    user,
  } = req;
  try {
    const comment = await Comment.findById(commentId);
    if (comment.creatorId.toString() === user.id) {
      await Comment.remove({ _id: commentId });
      res.status(200);
      //   await Video.comments.remove(comment.id);
      //   await Video.save();
      //   await comment.remove();
      // } else {
      //   console.log('else 실패');
      //   res.status(400);
    }
  } catch (error) {
    console.log('catch 실패');
    res.status(400);
  } finally {
    res.end();
  }
};
