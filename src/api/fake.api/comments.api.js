const comments = [
  {
    id: '67rdca3eeb7f6fg',
    userId: '67rdca3eeb7f6fgeed471815',
    pageId: '67rdca3eeb7f6fgeed471815',
    content: 'Lorem ipsum dolor',
    createdAt: '1633576399367',
  },
  {
    id: '67rdca3eeb7f6fgdasd',
    pageId: '67rdca3eeb7f6fgeed471815',
    userId: '67rdca3eeb7f6fgeed471815',
    content: 'Lorem ipsum dolor and etc',
    createdAt: '1633573058520',
  },
  {
    id: '67rdca3eeb7f6fgdaasd',
    pageId: '67rdca3eeb7f6fgeed471817',
    userId: '67rdca3eeb7f6fgeed471815',
    content: 'Lorem ipsum dolor and etc',
    createdAt: '1633573058520',
  },
];

if (!localStorage.getItem('comments')) {
  localStorage.setItem('comments', JSON.stringify(comments));
}

const getAll = () => new Promise((resolve) => {
  window.setTimeout(() => {
    resolve(comments);
  }, 200);
});

const getByUserId = (userId) => new Promise((resolve) => {
  window.setTimeout(() => {
    resolve(
      JSON.parse(localStorage.getItem('comments')).filter(
        (comment) => comment.pageId === userId,
      ),
    );
  }, 200);
});
const post = (data) => new Promise((resolve) => {
  window.setTimeout(() => {
    const comments = JSON.parse(localStorage.getItem('comments'));
    const newComment = {
      ...data,
      createdAt: Date.now().toString(),
      id: Math.random().toString(36).substr(2, 9),
    };
    localStorage.setItem(
      'comments',
      JSON.stringify([...comments, newComment]),
    );
    resolve(newComment);
  }, 200);
});

const remove = (id) => new Promise((resolve) => {
  window.setTimeout(() => {
    const comments = JSON.parse(localStorage.getItem('comments'));
    const newComments = comments.filter((comment) => comment.id !== id);
    localStorage.setItem('comments', JSON.stringify(newComments));
    resolve(id);
  }, 200);
});

export default {
  getAll,
  getByUserId,
  post,
  remove,
};
