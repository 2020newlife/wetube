import axios from 'axios';

const addCommentForm = document.getElementById('jsAddCommentForm');
const commentList = document.getElementById('jsCommentList');
const commentNumber = document.getElementById('jsCommentNumber');

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

// const decreaseNumber = () => {
//   const commentNumber1 = increaseNumber();
//   commentNumber.innerText = commentNumber1 - 1;
// };

const addComment = (comment, videoId, commentId) => {
  console.log('addComment에서 comments 값:', comment);
  console.log('addComment에서 videoId 값:', videoId);
  console.log('addComment에서 commentId 값:', commentId);

  const div = document.createElement('div');
  div.className = 'commentBlock';
  const span = document.createElement('span');
  span.innerHTML = comment;
  const button = document.createElement('button');
  button.innerHTML = 'x';
  console.log('값바꾸기 전 comment id:', commentId);
  button.value = commentId;
  console.log('값바꾸기 후 버튼 값:', button.value);
  button.className = 'commentDelete';
  button.addEventListener('click', handleDeleteComment);
  div.appendChild(span);
  div.appendChild(button);
  commentList.prepend(div);
  increaseNumber();
};

const sendComment = async (videoId, comment) => {
  await axios({
    url: `/api/comment/add`,
    method: 'POST',
    data: {
      comment,
      videoId,
    },
    header: {
      'Content-Type': 'application/json',
    },
  }).then(response => {
    console.log('response.data:', response.data);
    const { commentId } = response.data;
    console.log('response에서 commendId:', commentId);
    addComment(comment, videoId, commentId);
  });
};

const handleSubmit = event => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input[name='comment']");
  const comment = commentInput.value;
  const videoID = addCommentForm.querySelector("input[name='videoId']").value;
  sendComment(videoID, comment);

  commentInput.value = '';
};

const handleDeleteComment = async event => {
  const commentId = event.target.value;
  console.log('dsfsdf:', event.target);
  const response = await axios({
    url: `/api/comment/delete`,
    method: 'POST',
    data: {
      commentId,
    },
  });
  //   console.log(response.status);
  if (response.status === 200) {
    const commentDeleteButtonArray = document.getElementsByClassName(
      'commentDelete'
    );
    for (let i = 0; i < commentDeleteButtonArray.length; i += 1) {
      if (commentDeleteButtonArray[i].value === commentId) {
        commentDeleteButtonArray[i].parentElement.remove();
      }
    }
  }
  decreaseNumber();
};

function initAddCommentForm() {
  addCommentForm.addEventListener('submit', handleSubmit);

  const commentDeleteButtonArray = document.getElementsByClassName(
    'commentDelete'
  );
  for (let i = 0; i < commentDeleteButtonArray.length; i += 1) {
    commentDeleteButtonArray[i].addEventListener('click', handleDeleteComment);
  }
}

if (addCommentForm || commentList) {
  initAddCommentForm();
}
