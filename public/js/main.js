'use strict';

const output = document.querySelector('#output');
const button = document.querySelector('#get-posts-btn');

async function showPosts() {
  try {
    const res = await fetch('/api/posts');
    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }

    const posts = await res.json();

    posts.forEach((post) => {
      const postEl = document.createElement('div');
      postEl.textContent = post.title;
      output.appendChild(postEl);
    });
  } catch (error) {
    console.error(error);
  }
}

button.addEventListener('click', showPosts);
