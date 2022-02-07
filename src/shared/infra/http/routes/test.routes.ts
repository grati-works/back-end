import { Router, Request, Response } from 'express';

const testRoutes = Router();

testRoutes.get(
  '/',
(request: Request, response: Response) => {
    response.send('Hello World!');
} 
);

export { testRoutes };