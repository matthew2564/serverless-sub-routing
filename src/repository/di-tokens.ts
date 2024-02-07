import { Token } from 'typedi';
import { DataSource } from 'typeorm';
import {Logger} from "@aws-lambda-powertools/logger";
import {SecretsManager} from "@dvsa/cvs-microservice-common/classes/aws/secrets-manager-client";
export const SESSION = new Token<DataSource>('DATABASE_SESSION');
export const LOGGER = new Token<Logger>('LOGGER');
export const SECRETS_MANAGER = new Token<SecretsManager>('SECRETS_MANAGER');
