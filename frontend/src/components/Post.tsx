import type { Post } from "../types/Post";

interface PostProps {
  post: Post;
}

function PostComponent({ post }: PostProps) {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <small>{post.createdAt}</small>
    </div>
  );
}

export default PostComponent;