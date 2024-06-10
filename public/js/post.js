async function main() {
  const postIdField = document.querySelector('#postId');
  const postTitleField = document.querySelector('#postTitle');

  postIdField.textContent = ``;
  postTitleField.textContent = ``;

  const params = new URL(document.URL).searchParams;
  const id = parseInt(params.get('id'));

  if (id && !isNaN(id)) {
    try {
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
  }
}
main();
