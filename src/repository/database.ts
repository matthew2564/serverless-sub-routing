import { DataSource } from 'typeorm';
import {Container, Inject, Service} from 'typedi';
import { Logger } from '@aws-lambda-powertools/logger';
import {LOGGER, SESSION} from './di-tokens';

@Service()
export class Database {
    private static logger: Logger;

    constructor(@Inject(LOGGER) logger: Logger) {
        Database.logger = logger;
    }

    private static session: DataSource | null = null;

    /**
     * Initialize and register the database connection
     * @param connection
     */
    static async initialiseAndRegister(connection: DataSource): Promise<void> {
        try {
            Database.session = connection;

            await Database.session.initialize();

            Container.set(SESSION, Database.session);

            this.logger.info('Connection has been initialized and registered!');
        } catch (error) {
            this.logger.error('Error during Connection initialization:', (error as Error).message);
        }
    }

    /**
     * Close the database connection
     */
    static async closeConnection(): Promise<void> {
        if (Database.session) {
            await Database.session.destroy();
            this.logger.info('Database connection closed.');
        }
    }
}
