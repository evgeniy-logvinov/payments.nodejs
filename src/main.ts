import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ConfigService } from '@nestjs/config';

import * as firebase from 'firebase-admin';

const firebase_params = {
  type: process.env.FIREBASE_TYPE,
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  clientId: process.env.FIREBASE_CLIENT_ID,
  authUri: process.env.FIREBASE_AUTH_URL,
  tokenUri: process.env.FIREBASE_TOKEN_URL,
  authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  clientC509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};

async function bootstrap() {
  // TODO: config url api/v1
  const app = await NestFactory.create(AppModule);
  firebase.initializeApp({
    credential: firebase.credential.cert(firebase_params),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });

  app.enableCors();
  await app.listen(process.env.API_PORT || 4000);
}
bootstrap();
