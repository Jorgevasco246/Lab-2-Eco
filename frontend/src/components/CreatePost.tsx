import { useState } from "react";
import type { Post } from "../types/Post";

interface CreatePostProps {
  onCreatePost: (post: Post) => void;
}

function CreatePost({ onCreatePost }: CreatePostProps) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPost: Post = {
      id: Date.now(),
      title,
      content,
      createdAt: new Date().toISOString(),
    };

    onCreatePost(newPost);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Contenido"
      />

      <button type="submit">Crear post</button>
    </form>
  );
}

export default CreatePost;