import 'reflect-metadata';
import serverless from 'serverless-http';
import {createExpressServer, useContainer} from 'routing-controllers';
import {UserController} from "./controllers/UserController";
import {NotFoundMiddleware} from "./middleware/NotFoundMiddleware";
import {Container} from "typedi";

// This line tells routing-controllers to use typedi container
useContainer(Container);

const app = createExpressServer({
    controllers: [UserController], // We specify controllers to use
    middlewares: [NotFoundMiddleware],
});

if (process.env.IS_OFFLINE === 'true') {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
}
export const handler = serverless(app);
