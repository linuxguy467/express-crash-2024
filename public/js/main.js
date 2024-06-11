'use strict';

// helpers
function getDOMElementFromHTMLString(htmlStr) {
  const container = document.createElement('div');
  container.innerHTML = htmlStr;
  return container.firstElementChild;
}

// Get posts
async function showPosts() {
  try {
    const output = document.querySelector('#output');

    let posts = {};

    if (!('posts' in localStorage)) {
      const res = await fetch('/api/posts');
      if (!res.ok) {
        throw new Error('Failed to fetch posts');
      }

      posts = await res.json();
      localStorage.setItem('posts', JSON.stringify(posts));
    } else {
      posts = JSON.parse(localStorage.getItem('posts'));
    }

    while (output.lastElementChild) {
      output.removeChild(output.lastElementChild);
    }

    posts.forEach((post) => {
      const postHTML = `
        <div>
          <a href="post.html" id="postLink">${post.title}</a>
          <button type="button" id="postUpdateBtn">Update Post</button>
          <button type="button" id="postDelBtn">X</button>
        </div>
      `;

      const postEl = getDOMElementFromHTMLString(postHTML);

      postEl.querySelector('#postLink').addEventListener('click', () => {
        localStorage.setItem('clickedPost', `${post.id}`);
      });
      postEl
        .querySelector('#postDelBtn')
        .addEventListener('click', async (e) => {
          e.preventDefault();
          try {
            if (confirm('Are you sure you want to delete this post?')) {
              const res = await fetch(`/api/posts/${post.id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
              });

              if (!res.ok) {
                throw new Error(`Failed to delete post with id ${id}`);
              }

              localStorage.removeItem('posts');
              showPosts();
            }
          } catch (error) {
            console.error(error);
          }
        });

      postEl.querySelector('#postUpdateBtn').addEventListener('click', (e) => {
        e.preventDefault();
        if (postEl.getElementsByTagName('dialog')[0]) {
          postEl.getElementsByTagName('dialog')[0].showModal();
        } else if (output.getElementsByTagName('dialog')[0]) {
          alert(
            `There is an existing dialog showing a post. Please click 'Cancel' on that dialog or submit the update post form`
          );
        } else {
          const dialog = `
            <dialog id="infoModal-post">
              <h2>Update Post</h2>
              <form id="update-post">
                <label for="post-title">Title:</label>
                <input
                  type="text"
                  id="post-title"
                  name="title"
                  value="${post.title}"
                /><br /><br />
                <button type="button" id="cancelBtn">Cancel</button>
                <button type="submit">Update</button>
              </form>
            </dialog>
          `;

          const dialogEl = getDOMElementFromHTMLString(dialog);

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
            }
          });

          postEl.appendChild(dialogEl);

          document
            .querySelector('#cancelBtn')
            .addEventListener('click', (e) => {
              e.preventDefault();
              dialogEl.close();
              postEl.removeChild(dialogEl);
            });

          document
            .querySelector('#update-post')
            .addEventListener('submit', async function (e) {
              e.preventDefault();
              const formData = new FormData(this);
              const title = formData.get('title');

              try {
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
                localStorage.removeItem('posts');
                showPosts();
              } catch (error) {
                console.error(error);
              }
            });

          dialogEl.showModal();
        }
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

  this.querySelector('#title').value = '';

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
    localStorage.removeItem('posts');
    showPosts();
  } catch (error) {
    console.error(error);
  }
}

// Event Listeners
document.querySelector('#get-posts-btn').addEventListener('click', showPosts);
document.querySelector('#add-post-form').addEventListener('submit', addPost);
