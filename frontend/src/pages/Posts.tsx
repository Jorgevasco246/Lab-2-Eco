import { useEffect, useState } from "react";
import type { Post } from "../types/Post";

function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);

  // traer posts del backend
  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:1234/api/posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // borrar post
  const deletePost = async (id: string) => {
    try {
      await fetch(`http://localhost:1234/api/posts/${id}`, {
        method: "DELETE",
      });

      // refrescar lista despues de borrar
      fetchPosts();

    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // cargar al abrir página
  useEffect(() => {
  const loadPosts = async () => {
    await fetchPosts();
  };

  loadPosts();
  }, []);

  // refrescar cuando se cree un post
  useEffect(() => {
    window.addEventListener("postCreated", fetchPosts);

    return () => {
      window.removeEventListener("postCreated", fetchPosts);
    };
  }, []);

  return (
    <div>
      <h2>Posts</h2>

      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.description}</p>

          {post.imageUrl && (
            <img src={post.imageUrl} width="200" alt={post.title} />
          )}

          <br />

          <button onClick={() => deletePost(post.id)}>
            Borrar
          </button>
        </div>
      ))}
    </div>
  );
}

export default Posts;