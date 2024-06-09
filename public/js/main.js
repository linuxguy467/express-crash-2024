'use strict';

const output = document.querySelector('#output');
const button = document.querySelector('#get-posts-btn');
const form = document.querySelector('#add-post-form');

// Get posts
async function showPosts() {
  try {
    const res = await fetch('/api/posts');
    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }

    const posts = await res.json();

    while (output.lastElementChild) {
      output.removeChild(output.lastElementChild);
    }

    posts.forEach((post) => {
      const postEl = document.createElement('div');
      postEl.textContent = post.title;
      postEl.addEventListener('click', () => {
        const dialog = `
        <dialog id="infoModal-post">
          <h2>Post Details</h2>
          <form id="update-post">
            <label for="post-title">Title:</label>
            <input type="text" id="post-title" name="title" value="${post.title}"/><br /><br />
            <button type="submit">Update Post</button>
          </form>
        </dialog>
        `;
        const dialogContainer = document.createElement('div');
        dialogContainer.innerHTML = dialog;
        const dialogEl = dialogContainer.firstElementChild;

        dialogEl.addEventListener('click', (e) => {
          e.stopPropagation();
          const dialogDimensions = dialogEl.getBoundingClientRect();
          if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
          ) {
            dialogEl.close();
            postEl.removeChild(dialogEl);
          }
        });

        postEl.appendChild(dialogEl);

        document
          .querySelector('#update-post')
          .addEventListener('submit', async function (e) {
            e.preventDefault();
            const formData = new FormData(this);
            const title = formData.get('title');

            const res = await fetch(`/api/posts/${post.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ title }),
            });

            if (!res.ok) {
              throw new Error('Failed to update post');
            }

            dialogEl.close();
            postEl.removeChild(dialogEl);
            showPosts();
          });

        dialogEl.showModal();
      });
      output.appendChild(postEl);
    });
  } catch (error) {
    console.error(error);
  }
}

// Submit new post
async function addPost(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const title = formData.get('title');

  try {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) {
      throw new Error('Failed to add post');
    }

    const newPost = await res.json();

    const postEl = document.createElement('div');
    postEl.textContent = newPost.title;
    output.appendChild(postEl);
    showPosts();
  } catch (error) {
    console.error(error);
  }
}

// Event Listeners
button.addEventListener('click', showPosts);
form.addEventListener('submit', addPost);
