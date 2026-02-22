import { useState } from "react";

import type { Post } from "./types/Post";

import CreatePost from "./components/CreatePost";
import PostComponent from "./components/Post";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  const handleCreatePost = (post: Post) => {
    setPosts([...posts, post]);
  };

  return (
    <>
      <CreatePost onCreatePost={handleCreatePost} />

      {posts.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </>
  );
}

export default App;