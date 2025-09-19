import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuthContext } from "../context/AuthContext.jsx";
import { fetchAPI } from "../utils/api.js";
import PostCard from "../components/PostCard.jsx";
import CreatePost from "../components/CreatePost.jsx";

const socket = io("http://localhost:5000"); // adjust if backend runs elsewhere

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const { token } = useAuthContext();

  const getPosts = async () => {
    const data = await fetchAPI("/posts", "GET", null, token);
    setPosts(data);
  };

  useEffect(() => {
    getPosts();

    socket.on("newPost", (post) => {
      setPosts((prev) => [post, ...prev]);
    });

    return () => {
      socket.off("newPost");
    };
  }, []);

  return (
    <div>
      <h1>Feed</h1>
      <CreatePost refreshPosts={getPosts} socket={socket} />
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
}
