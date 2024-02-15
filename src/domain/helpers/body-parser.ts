export const BodyParser = <T>(body: object | Buffer): T =>
	Buffer.isBuffer(body) ? JSON.parse(body.toString('utf-8')) : body;
