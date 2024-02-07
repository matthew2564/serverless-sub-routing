import 'reflect-metadata';
import serverless from 'serverless-http';
import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { VehicleResource } from './resources/VehicleResource';
import { NotFoundMiddleware } from './middleware/NotFoundMiddleware';
import { CustomErrorMiddleware } from './middleware/CustomErrorMiddleware';
import { BeforeMiddleware } from './middleware/BeforeMiddleware';

// This line tells routing-controllers to use typedi container
useContainer(Container);

const app = createExpressServer({
	cors: true,
	defaultErrorHandler: false,
	controllers: [VehicleResource],
	middlewares: [BeforeMiddleware, CustomErrorMiddleware, NotFoundMiddleware],
});

if (process.env.IS_OFFLINE === 'true') {
	const port = process.env.PORT || 3000;
	app.listen(port, () => console.log(`Server running on port ${port}`));
}

export const handler = serverless(app);
