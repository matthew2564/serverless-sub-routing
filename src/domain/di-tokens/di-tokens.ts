import { Token } from 'typedi';
import { Logger } from '@aws-lambda-powertools/logger';
import { SecretsManager } from '@dvsa/cvs-microservice-common/classes/aws/secrets-manager-client';
export const CONNECTION = new Token('CONNECTION');
export const LOGGER = new Token<Logger>('LOGGER');
export const SECRET = new Token<SecretsManager>('SECRET');
