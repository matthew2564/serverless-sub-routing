import 'reflect-metadata';
import serverless from 'serverless-http';
import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { DefectsResource } from './resources/DefectsResource';
import { BeforeMiddleware } from './middleware/BeforeMiddleware';
import { CustomErrorMiddleware } from './middleware/CustomErrorMiddleware';
import { NotFoundMiddleware } from './middleware/NotFoundMiddleware';
import { VersionResource } from './resources/VersionResource';

// This line tells routing-controllers to use typedi container
useContainer(Container);

export const app = createExpressServer({
	cors: true,
	defaultErrorHandler: false,
	controllers: [DefectsResource, VersionResource],
	middlewares: [BeforeMiddleware, CustomErrorMiddleware, NotFoundMiddleware],
});

if (process.env.IS_OFFLINE === 'true') {
	const port = process.env.PORT || 3000;
	app.listen(port, () => console.log(`Server running on port ${port}`));
}

export const handler = serverless(app);
