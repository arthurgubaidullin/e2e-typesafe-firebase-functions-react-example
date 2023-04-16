import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { FirebaseApp, initializeApp } from 'firebase/app';

export const app: FirebaseApp = initializeApp({
  projectId: process.env.NX_PROJECT_ID,
});

const functions = getFunctions(app);
if (window.location.hostname.startsWith('localhost')) {
  connectFunctionsEmulator(functions, 'localhost', 5001);
}
