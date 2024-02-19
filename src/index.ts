/* eslint-disable */
import 'reflect-metadata';
import 'source-map-support/register';
import serverless from 'serverless-http';
import { Action, createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { OperatorVisitResource } from './resources/OperatorVisitResource';
import { NotFoundMiddleware } from './middleware/NotFoundMiddleware';
import { CustomErrorMiddleware } from './middleware/CustomErrorMiddleware';
import { BeforeMiddleware } from './middleware/BeforeMiddleware';
import { VersionResource } from './resources/VersionResource';
import { AuditResource } from './resources/AuditResource';
import { DriverEncounterResource } from './resources/DriverEncounterResource';
import { OperatorScoresResource } from './resources/OperatorScoresResource';
import {EncounterResource} from "./resources/EncounterResource";

// This line tells routing-controllers to use typedi container
useContainer(Container);

const app = createExpressServer({
	cors: true,
	defaultErrorHandler: false,
	controllers: [AuditResource, DriverEncounterResource, EncounterResource, OperatorScoresResource, OperatorVisitResource, VersionResource],
	middlewares: [BeforeMiddleware, CustomErrorMiddleware, NotFoundMiddleware],
	authorizationChecker: ({ request }: Action, roles: string | string[]) => {
		// if running locally, skip the auth check
		if (process.env.IS_OFFLINE === 'true') return true;

		// check if a singular or list of roles were passed into the @Authorized decorator & remove nullish values
		const requiredRoles = (Array.isArray(roles) ? roles : [roles]).filter((role) => !!role);

		// if empty, then assume users with a valid token can access the resource without needing any specific role
		if (requiredRoles.length === 0) return true;

		// extract the `roles` property from JWT claims object
		const tokenRoles = (request as APIGatewayProxyEvent).requestContext.authorizer?.jwt.claims.roles;

		// if there are no roles in JWT token, then deny access to resource
		if (!tokenRoles || tokenRoles.length === 0) return false;

		// check if one of the required roles is present in JWT token, and if so allow access
		// @TODO: Check if this needs to be every/some role
		return requiredRoles.some((role) => tokenRoles.includes(role));
	},
});

if (process.env.IS_OFFLINE === 'true') {
	const port = process.env.PORT || 3000;
	app.listen(port, () => console.log(`Server running on port ${port}`));
}

export const handler = serverless(app);
