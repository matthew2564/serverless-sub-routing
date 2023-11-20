import 'reflect-metadata';
import serverless from 'serverless-http';
import {createExpressServer} from 'routing-controllers';
import {UserController} from "./controller/UserController";
import {NotFoundMiddleware} from "./middleware/NotFoundMiddleware";

const app = createExpressServer({
    controllers: [UserController], // We specify controllers to use
    middlewares: [NotFoundMiddleware],
});

if (process.env.IS_OFFLINE === 'true') {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
}
export const handler = serverless(app);
