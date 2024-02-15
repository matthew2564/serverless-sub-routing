import { Token } from 'typedi';
import { Logger } from '@aws-lambda-powertools/logger';
import { Connection } from 'mysql2';
import { Secret } from '../models/Secret';
export const CONNECTION = new Token<Connection>('CONNECTION');
export const LOGGER = new Token<Logger>('LOGGER');
export const SECRET = new Token<Secret>('SECRET');
