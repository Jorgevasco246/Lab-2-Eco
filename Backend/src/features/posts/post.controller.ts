import { Request, Response } from "express";
import { Post } from "./post.types";

export class PostController {
  private posts: Post[] = [];

  // GET /posts
  getPosts = (req: Request, res: Response) => {
    res.json(this.posts);
  };

  // POST /posts
  createPost = (req: Request, res: Response) => {
    const { imageUrl, title, description } = req.body;

    const newPost: Post = {
      id: Date.now().toString(),
      imageUrl,
      title,
      description,
    };

    this.posts.push(newPost);
    res.status(201).json(newPost);
  };

  // DELETE /posts/:id
  deletePost = (req: Request, res: Response) => {
    const { id } = req.params;

    this.posts = this.posts.filter(post => post.id !== id);

    res.json({ message: "Post eliminado" });
  };
}