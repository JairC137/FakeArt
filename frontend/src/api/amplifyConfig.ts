import { Amplify } from 'aws-amplify';
import type { ResourcesConfig } from 'aws-amplify'; // 👈 tipado v6
import { env } from '../utils/env';

export const configureAmplify = () => {
  const config: ResourcesConfig = {
    Auth: {
      Cognito: {
        userPoolId: env('EXPO_PUBLIC_COGNITO_USER_POOL_ID'),
        userPoolClientId: env('EXPO_PUBLIC_COGNITO_CLIENT_ID'),
        region: env('EXPO_PUBLIC_COGNITO_REGION'),
        // loginWith: { email: true }, // opcional
      },
    },
  };

  Amplify.configure(config);
};
