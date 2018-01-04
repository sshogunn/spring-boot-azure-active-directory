import AuthenticationContext from "adal-angular/dist/adal.min";
import adalConfig from "./adal-config";

export const authContext = new AuthenticationContext(adalConfig);

// returns token for specified resourceId
export function adalGetToken(resourceId) {
    return new Promise((resolve, reject) => {
        authContext.acquireToken(resourceId, (descr, token, msg) => {
            // console.log(`description=${descr}; token=${token}; msg=${msg}`);
            if (!msg) {
                resolve(token);
            }
            else {
                reject({ descr, msg });
            }
        });
    });
}

export function runWithAdal(app) {
    if (authContext.isCallback(window.location.hash)) {
        authContext.handleWindowCallback();
    } else {
        //prevent double rendering in iframe
        if (window === window.parent && !window.opener) {
            if (!authContext.getCachedToken(authContext.config.clientId) ||
                !authContext.getCachedUser()) {
                authContext.login();
            } else {
                app();
            }
        }
    }
}

// makes an asyncronous call to the secured endpoint, providing suitable bearer token
export function adalFetch(url, options) {
    return adalGetToken(adalConfig.endpoints.api)
        .then((token) => {
            const o = options;
            if (!o.headers) o.headers = {};
            o.headers.Authorization = `Bearer ${token}`;
            return fetch(url, options);
        })
        .catch(err => {
            console.log(err);
        });
}

export function adalLogOut() {
    authContext.logOut();
}