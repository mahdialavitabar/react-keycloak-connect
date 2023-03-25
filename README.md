## React Keycloak Provider

The KeycloakProvider is a React component that wraps your application and provides authentication and authorization capabilities using Keycloak.

## Installation

To install the package, run:

```bash
npm install keycloak-js react-keycloak-connect
```

## Usage

To use the KeycloakProvider, wrap your application with it and pass the required props.

```typescript
import { KeycloakProvider } from "./KeycloakProvider";
import App from "./App";
import keycloakConfig from "./keycloak.json";

function Root() {
  return (
    <KeycloakProvider keycloakConfig={keycloakConfig}>
      <App />
    </KeycloakProvider>
  );
}
```

## Props

keycloakConfig: A required object containing Keycloak configuration. You can obtain this object from the Keycloak Admin Console.

initOptions: An optional object containing initialization options for Keycloak.

LoadingComponent: An optional React component that is rendered while Keycloak is initializing.

onTokens: An optional function that is called whenever new tokens are issued. It receives the ID token, refresh token, and access token as arguments.

onEvent: An optional function that is called whenever a Keycloak event is triggered. It receives the event and an error object as arguments.

## Context

The KeycloakProvider component provides a KeycloakContext context that contains the following properties and methods:

keycloak: The Keycloak instance.

initialized: A boolean indicating whether Keycloak has finished initializing.

keycloakReady: A boolean indicating whether the user is authenticated.

keycloakProfile: The user's profile information.

login(): A function that logs the user in.

logout(): A function that logs the user out.

updateToken(minValidity): A function that updates the user's access token. It returns a promise that resolves with a boolean indicating whether the token was successfully updated.

refreshToken(minValidity): A function that refreshes the user's access token. It returns a promise that resolves with a boolean indicating whether the token was successfully refreshed.

onTokens(idToken, refreshToken, token): An optional callback function that is called whenever new tokens are issued.

onEvent(event, error): An optional callback function that is called whenever a Keycloak event is triggered.

To access the context, use the useContext hook:

```typescript
import { useContext } from "react";
import { KeycloakContext } from "./KeycloakProvider";

function MyComponent() {
  const { keycloak } = useContext(KeycloakContext);

  return (
    <div>
      {keycloak.authenticated ? (
        <p>Hello, {keycloak.profile.username}!</p>
      ) : (
        <p>Please log in to continue.</p>
      )}
    </div>
  );
}
```

License
This project is licensed under the MIT License.
