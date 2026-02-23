import { Request, Response } from "express";
import { Post } from "./post.types";
import  Boom  from "@hapi/boom";

export class PostController {
  private posts: Post[] = [];

  //GEt
  getPosts = (req: Request, res: Response) => {
    res.json(this.posts);
  };

  // POST
  createPost = (req: Request, res: Response) => {
    const { imageUrl, title, description } = req.body;

    if (title === undefined) {
            throw Boom.badRequest("Title is required");
        }
        if (description === undefined) {
            throw Boom.badRequest("Description is required");
        }


    const newPost: Post = {
      id: Date.now().toString(),
      imageUrl,
      title,
      description,
    };

    this.posts.push(newPost);
    res.json(newPost);
  };

  // Ddelete
  deletePost = (req: Request, res: Response) => {
  const { id } = req.params;
  this.posts = this.posts.filter(post => post.id !== id);
  return res.send({ message: "Post eliminado" });
  };
}