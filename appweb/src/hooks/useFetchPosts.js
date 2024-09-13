import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPosts } from '../redux/postsSlice';

const useFetchPosts = (userId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        const posts = await postsResponse.json();
        const postsWithComments = await Promise.all(posts.map(async (post) => {
          const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`);
          const comments = await commentsResponse.json();
          return { ...post, comments };
        }));
        dispatch(setPosts(postsWithComments));
      } catch (error) {
        console.error('Error fetching posts or comments:', error);
      }
    };

    fetchPosts();
  }, [userId, dispatch]);
};

export default useFetchPosts;
