import { CLEARBLADE_HEADERS, CLEAR_BLADE_SYSTEM_KEY, CLEAR_BLADE_SYSTEM_SECRET, HOST, HOST_URL, REST_API_URL } from "./config/constants";

const ClearBlade = require('clearblade');
const fetch = require('node-fetch');

const user = require('./config/user')

const authenticate = async (user) => {
    return fetch(`${REST_API_URL}/user/auth`, {
        method: 'post',
        body: JSON.stringify(user),
        headers: {
            ...CLEARBLADE_HEADERS,
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
}

const onInit = async (err, body) => {
    if (err) {
        throw new Error(body);
    }

    const authToken = body.authToken
    if (authToken) {
        console.log("Login successful")
    }

    const profile = await authenticate(user);
    const account_id = profile.options.account_id

    let initializedMessaging = false
    const messaging = ClearBlade.Messaging({}, (a, b) => {
        // There seems to be a bug with ClearBlade where if you subscribe to any
        // topic, then then the MessagingInit callback keeps getting called
        // and you end up with lots of reentrancy
        if (initializedMessaging) {
            return
        }

        initializedMessaging = true
        messaging.subscribe(`user/${account_id}/device/reported`, undefined /*options*/, (a) => {
            // console.log(a.toString('utf-8'))
        })
        messaging.subscribe(`user/${account_id}/device/desired`, undefined /*options*/, (a) => {
            // console.log(a.toString('utf-8'))
        })
    });
};

ClearBlade.init({
    "email": user.email,
    "password": user.password,
    "systemKey": CLEAR_BLADE_SYSTEM_KEY,
    "systemSecret": CLEAR_BLADE_SYSTEM_SECRET,
    "URI": HOST_URL,
    "messagingURI": HOST,
    "callback": onInit,
});