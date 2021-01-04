import '../scss/styles.scss';
import './videoPlayer';
import './videoRecorder';
import './addComment';

const toggleBtn = document.querySelector('.toggleBtn_header');
const userInfo = document.querySelector('.header_userInfo');
const searchForm = document.querySelector('.searchForm');

toggleBtn.addEventListener('click', () => {
  searchForm.classList.toggle('active');
  userInfo.classList.toggle('active');
});
