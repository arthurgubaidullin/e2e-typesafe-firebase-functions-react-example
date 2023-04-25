import { SimpleContract } from '@e2e-typesafe-firebase-functions-react-example/data-transfer-contract';
import { enforceCaller } from '@e2e-typesafe-firebase-functions-react-example/https-callable-client-enforcer';
import { FirebaseApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { pipe } from 'fp-ts/lib/function';

export const helloWorld = (app: FirebaseApp) =>
  pipe(
    httpsCallable(getFunctions(app), 'helloWorld'),
    enforceCaller(SimpleContract)
  );
