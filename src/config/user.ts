const env_email = process.env.RHEEM_ECONET_EMAIL || null;
const env_password = process.env.RHEEM_ECONET_PASSWORD || null;

const local_user = require('./user.local')

if (env_email && env_password) {
    module.exports = {
        "email": env_email,
        "password": env_password,
    }
} else if (local_user && local_user.email && local_user.password) {
    module.exports = local_user
} else {
    throw new Error("Unable to detect user email and password. Did you forget to edit the user.local.ts file?");
}