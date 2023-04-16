import { SimpleContract } from '@end-to-end-typesafe-firebase-functions/data-transfer-contract';
import { enforceCaller } from '@end-to-end-typesafe-firebase-functions/https-callable-client-enforcer';
import { FirebaseApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { pipe } from 'fp-ts/lib/function';

export const helloWorld = (app: FirebaseApp) =>
  pipe(
    httpsCallable(getFunctions(app), 'helloWorld'),
    enforceCaller(SimpleContract)
  );
