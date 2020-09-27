export const HOST = "rheem.clearblade.com";
export const HOST_URL = `https://${HOST}`;
export const REST_API_URL = `${HOST_URL}/api/v/1`;

export const CLEAR_BLADE_SYSTEM_KEY = "e2e699cb0bb0bbb88fc8858cb5a401";
export const CLEAR_BLADE_SYSTEM_SECRET = "E2E699CB0BE6C6FADDB1B0BC9A20";

export const HEADERS = {
    "ClearBlade-SystemKey": CLEAR_BLADE_SYSTEM_KEY,
    "ClearBlade-SystemSecret": CLEAR_BLADE_SYSTEM_SECRET,
    "Content-Type": "application/json; charset=UTF-8"
};