import React, { useState, useContext } from 'react';
import DataContext from './context/DataContext';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import api from './api/posts';

const NewPost = () => {
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const { posts, setPosts } = useContext(DataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const res = await api.post('/posts', newPost);
      const allPosts = [...posts, res.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate('/');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <main className='NewPost'>
      <h2>NewPost</h2>
      <form className='newPostForm' onSubmit={handleSubmit}>
        <label htmlFor='postTitle'>Title:</label>
        <input
          type='text'
          id='postTitle'
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor='postBody'>Post:</label>
        <textarea
          required
          id='postBody'
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
          cols='30'
          rows='10'
        />
        <button type='submit'>Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
