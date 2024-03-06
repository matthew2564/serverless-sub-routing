import { Token } from 'typedi';
import { Logger } from '@aws-lambda-powertools/logger';

export const LOGGER = new Token<Logger>('LOGGER');
