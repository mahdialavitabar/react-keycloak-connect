import Keycloak, { KeycloakProfile } from "keycloak-js";
import React from "react";
interface CustomKeycloakInstance extends Keycloak {
    initialized: boolean;
}
interface KeycloakContextType {
    keycloak: CustomKeycloakInstance | null;
    initialized: boolean;
    keycloakReady: boolean;
    keycloakProfile: KeycloakProfile | null;
    login: () => void;
    logout: () => void;
    updateToken: (minValidity?: number) => Promise<boolean>;
    refreshToken: () => Promise<boolean>;
    onTokens?: (idToken: string, refreshToken: string, token: string) => void;
    onEvent?: (event: any, error?: Error) => void;
}
export interface KeycloakProviderProps {
    children: React.ReactNode;
    keycloakConfig: Keycloak.KeycloakConfig;
    initOptions?: Keycloak.KeycloakInitOptions;
    LoadingComponent?: React.ComponentType;
    onTokens?: (idToken: string, refreshToken: string, token: string) => void;
    onEvent?: (event: any, error?: Error) => void;
}
export declare function KeycloakProvider({ onTokens, onEvent, children, keycloakConfig, initOptions, LoadingComponent }: KeycloakProviderProps): JSX.Element;
export declare function useKeycloak(): KeycloakContextType;
export {};
//# sourceMappingURL=keycloakWrapper.d.ts.map