import * as express from "express";

const withCatching = (handler: express.RequestHandler) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): express.RequestHandler => {
  return handler(req, res, next).catch((e: Error) => {
    console.error(e);

    next(e);
  });
};

export { withCatching };
