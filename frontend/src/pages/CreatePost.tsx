import { useState } from "react";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPost = {
      title,
      description,
      imageUrl,
    };

    try {
      const response = await fetch("http://localhost:1234/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      const data = await response.json();
      console.log("Post creado:", data);

      // limpiar inputs
      setTitle("");
      setDescription("");
      setImageUrl("");

      // avisar a Posts que refresque
      window.dispatchEvent(new Event("postCreated"));

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Post</h2>

      <input
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        placeholder="URL Imagen"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <button type="submit">Crear</button>
    </form>
  );
}

export default CreatePost;