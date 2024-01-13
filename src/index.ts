import 'reflect-metadata';
import serverless from 'serverless-http';
import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { UserResource } from './resources/UserResource';
import { NotFoundMiddleware } from './middleware/NotFoundMiddleware';

// This line tells routing-controllers to use typedi container
useContainer(Container);

const app = createExpressServer({
	cors: true,
	controllers: [UserResource],
	middlewares: [NotFoundMiddleware],
});

if (process.env.IS_OFFLINE === 'true') {
	const port = process.env.PORT || 3000;
	app.listen(port, () => console.log(`Server running on port ${port}`));
}

export const handler = serverless(app);
