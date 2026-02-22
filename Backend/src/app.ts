import express, { Router } from 'express';
import { NODE_ENV, PORT } from './config';
import cors from 'cors';
import { errorsMiddleware } from './middlewares/errorMiddlewares';

import { PostRouter } from './features/posts/post.router';
import { PostController } from './features/posts/post.controller';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, World!!!!! :)');
});

const apiRouter = Router();
app.use('/api', apiRouter);

const postController = new PostController();
const postRouter = new PostRouter(postController);

apiRouter.use(postRouter.router);

app.use(errorsMiddleware);

if (NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT);
  });
}

export default app;
