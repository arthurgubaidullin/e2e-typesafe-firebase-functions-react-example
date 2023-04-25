import { SimpleContract } from '@e2e-typesafe-firebase-functions-react-example/data-transfer-contract';
import { enforceHandler } from '@e2e-typesafe-firebase-functions-react-example/https-callable-server-enforcer';
import * as functions from 'firebase-functions';

const handler = enforceHandler(SimpleContract)(async (data) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  return { result: `Hello ${data.content}!` };
});

export const helloWorld = functions.https.onCall(handler);
