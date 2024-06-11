'use strict';

async function main() {
  const postIdField = document.querySelector('#postId');
  const postTitleField = document.querySelector('#postTitle');

  const id = parseInt(localStorage.getItem('clickedPostID'));

  if (id && !isNaN(id)) {
    try {
      postIdField.textContent = ``;
      postTitleField.textContent = ``;

      const res = await fetch(`/api/posts/${id}`);

      if (!res.ok) {
        throw new Error(`Failed to fetch post with id ${id}`);
      }

      const post = await res.json();

      postIdField.textContent = `${post.id}`;
      postTitleField.textContent = `${post.title}`;
    } catch (error) {
      console.error(error);
    }
  } else {
    console.error(new Error('The ID is not a number'));
  }
}
main();
