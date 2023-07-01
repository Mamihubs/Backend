// to make the file a module and avoid the TypeScript error
export {}

declare global {
  namespace Express {
    export interface Request {
      // Inorder to populate the Request object with some data maybe after a auth middleware, we can add those data here. Example is userId.
      userId?: string;
    }
  }
}
