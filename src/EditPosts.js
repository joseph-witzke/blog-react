import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function EditPosts({
  posts,
  handleEdit,
  editBody,
  setEditBody,
  editTitle,
  setEditTitle,
}) {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [posts, setEditBody, setEditTitle]);

  return (
    <main className='NewPost'>
      {editTitle && (
        <>
          <h2>Edit Post</h2>
          <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
            <label htmlFor='postTitle'>Title:</label>
            <input
              type='text'
              id='postTitle'
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor='postBody'>Post:</label>
            <textarea
              required
              id='postBody'
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
              cols='30'
              rows='10'
            />
            <button type='submit' onClick={() => handleEdit(post.id)}>
              Submit
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2>Post Not Found</h2>
          <p>Well, shoot...</p>
          <p>
            <Link to='/'>Visit Our Homepage</Link>
          </p>
        </>
      )}
    </main>
  );
}

export default EditPosts;
