import { SimpleContract } from '@end-to-end-typesafe-firebase-functions/data-transfer-contract';
import { enforceHandler } from '@end-to-end-typesafe-firebase-functions/https-callable-client-enforcer';
import * as functions from 'firebase-functions';

const handler = enforceHandler(SimpleContract)(async (data) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  return { result: `Hello ${data.content}!` };
});

export const helloWorld = functions.https.onCall(handler);
