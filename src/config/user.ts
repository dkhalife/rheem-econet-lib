const env_email = process.env.RHEEM_ECONET_EMAIL || null;
const env_password = process.env.RHEEM_ECONET_PASSWORD || null;

const local = require('./user.local')

export const user = (() => {
    if (env_email && env_password) {
        return {
            "email": env_email,
            "password": env_password,
        }
    }

    if (local.email && local.password) {
        return local
    }

    throw new Error("Unable to detect user email and password. Did you forget to edit the user.local.ts file?");
})()