import { Token } from 'typedi';
import { Logger } from '@aws-lambda-powertools/logger';
import { SecretModel } from '../models/SecretModel';

export const LOGGER = new Token<Logger>('LOGGER');
export const SECRET = new Token<SecretModel>('SECRET');
