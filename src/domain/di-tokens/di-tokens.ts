import { Token } from 'typedi';
import { Logger } from '@aws-lambda-powertools/logger';
import { default as Session } from 'mybatis-mapper/create-session';
import { Secret } from '../models/Secret';

export const SESSION = new Token<Session>('SESSION');
export const LOGGER = new Token<Logger>('LOGGER');
export const SECRET = new Token<Secret>('SECRET');
