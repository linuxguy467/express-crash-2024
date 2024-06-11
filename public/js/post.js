'use strict';

async function main() {
  if ('clickedPost' in localStorage) {
    const postIdField = document.querySelector('#postId');
    const postTitleField = document.querySelector('#postTitle');
    const id = parseInt(localStorage.getItem('clickedPost'));

    if (!isNaN(id)) {
      try {
        postIdField.textContent = ``;
        postTitleField.textContent = ``;

        let post = {};

        // fallback in case posts is removed from localStorage
        if (!('posts' in localStorage)) {
          const res = await fetch(`/api/posts/${id}`);

          if (!res.ok) {
            throw new Error(`Failed to fetch post with id ${id}`);
          }

          post = await res.json();
        } else {
          post = JSON.parse(localStorage.getItem('posts')).find(
            (p) => p.id === id
          );
        }

        postIdField.textContent = `${post.id}`;
        postTitleField.textContent = `${post.title}`;
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error(new Error('The ID is not a number'));
    }
  } else {
    console.error(new Error('The ID does not exist'));
  }
}
main();
