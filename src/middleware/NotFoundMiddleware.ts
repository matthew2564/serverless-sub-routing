import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';

@Middleware({ type: 'after' })
export class NotFoundMiddleware implements ExpressMiddlewareInterface {

    use({ path }: Request, res: Response, next: NextFunction): void {
        if (!res.headersSent) {
            res.status(404).send({ message: `Route '${path}' not found` });
        } else {
            next();
        }
    }
}
