"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useKeycloak = exports.KeycloakProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const keycloak_js_1 = __importDefault(require("keycloak-js"));
const react_1 = require("react");
const KeycloakContext = (0, react_1.createContext)({
    keycloak: null,
    initialized: false,
    keycloakReady: false,
    keycloakProfile: null,
    login: () => { },
    logout: () => { },
    updateToken: () => Promise.resolve(false),
    refreshToken: () => Promise.resolve(false),
    onTokens: () => { },
    onEvent: () => { },
});
function KeycloakProvider({ onTokens, onEvent, children, keycloakConfig, initOptions, LoadingComponent = () => (0, jsx_runtime_1.jsx)("div", { children: "Loading Keycloak..." }) }) {
    const [keycloak, setKeycloak] = (0, react_1.useState)(null);
    const [initialized, setInitialized] = (0, react_1.useState)(false);
    const [keycloakReady, setKeycloakReady] = (0, react_1.useState)(false);
    const [keycloakProfile, setKeycloakProfile] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const keycloakInstance = new keycloak_js_1.default(keycloakConfig);
        keycloakInstance
            .init(initOptions || {})
            .then((authenticated) => {
            setKeycloak(keycloakInstance);
            keycloakInstance.initialized = true;
            setInitialized(true);
            setKeycloakReady(authenticated);
            if (authenticated) {
                setKeycloakProfile(keycloakInstance.profile || null);
                const tokens = {
                    idToken: keycloakInstance.idToken || "",
                    refreshToken: keycloakInstance.refreshToken || "",
                    token: keycloakInstance.token || "",
                };
                if (onTokens) {
                    onTokens(keycloakInstance.idToken || "", keycloakInstance.refreshToken || "", keycloakInstance.token || "");
                }
            }
        })
            .catch((error) => console.log(error));
        if (onEvent) {
            keycloakInstance.onTokenExpired = () => onEvent("onTokenExpired");
            keycloakInstance.onAuthRefreshSuccess = () => onEvent("onAuthRefreshSuccess");
            keycloakInstance.onAuthRefreshError = () => onEvent("onAuthRefreshError");
            keycloakInstance.onAuthSuccess = () => onEvent("onAuthSuccess");
            keycloakInstance.onAuthError = (error) => onEvent("onAuthError", error);
            keycloakInstance.onAuthLogout = () => onEvent("onAuthLogout");
        }
        return () => {
            if (keycloakInstance.authenticated) {
                keycloakInstance.logout();
            }
        };
    }, [keycloakConfig, initOptions, onTokens, onEvent]);
    const login = (0, react_1.useMemo)(() => () => {
        if (keycloak) {
            keycloak.login();
        }
    }, [keycloak]);
    const logout = (0, react_1.useMemo)(() => () => {
        if (keycloak) {
            keycloak.logout();
        }
    }, [keycloak]);
    const updateToken = (0, react_1.useMemo)(() => (minValidity = 5) => {
        if (keycloak) {
            return keycloak.updateToken(minValidity).then((refreshed) => {
                if (refreshed) {
                    if (onTokens) {
                        onTokens(keycloak.idToken || "", keycloak.refreshToken || "", keycloak.token || "");
                    }
                }
                return refreshed;
            });
        }
    }, [keycloak, onTokens]);
    const refreshToken = (0, react_1.useMemo)(() => (minValidity = 5) => {
        if (keycloak) {
            return keycloak.updateToken(minValidity).then((refreshed) => {
                if (refreshed) {
                    if (onTokens) {
                        onTokens(keycloak.idToken || "", keycloak.refreshToken || "", keycloak.token || "");
                    }
                }
                return refreshed;
            });
        }
    }, [keycloak, onTokens]);
    const contextValue = (0, react_1.useMemo)(() => {
        var _a;
        return {
            keycloak: keycloak,
            initialized: (_a = keycloak === null || keycloak === void 0 ? void 0 : keycloak.initialized) !== null && _a !== void 0 ? _a : false,
            keycloakReady: keycloakReady,
            keycloakProfile: keycloakProfile,
            login: login,
            logout: logout,
            updateToken: updateToken,
            refreshToken: refreshToken,
            onTokens: onTokens,
        };
    }, [keycloak, initialized, keycloakReady, keycloakProfile, login, logout, updateToken, refreshToken, onTokens]);
    return (0, jsx_runtime_1.jsx)(KeycloakContext.Provider, Object.assign({ value: contextValue }, { children: initialized ? children : (0, jsx_runtime_1.jsx)(LoadingComponent, {}) }));
}
exports.KeycloakProvider = KeycloakProvider;
function useKeycloak() {
    const context = (0, react_1.useContext)(KeycloakContext);
    if (context === undefined) {
        throw new Error("useKeycloak must be used within a KeycloakProvider");
    }
    return context;
}
exports.useKeycloak = useKeycloak;
//# sourceMappingURL=keycloakWrapper.js.map