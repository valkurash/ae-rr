const fsUtils = require('../utils/fs');

const { getEndpointData } = fsUtils;
const MILLISECONDS_IN_SECOND = 1000;

function session(config) {
    let tokenExpired = false;
    let authorized = true;
    let scheduleTokenExpiryId;
    let scheduleTokenRefreshId;

    function scheduleTokenExpiry() {
        scheduleTokenExpiryId = setTimeout(() => {
            tokenExpired = true;
        }, config.tokenExpiresAfterSeconds * MILLISECONDS_IN_SECOND);
    }

    function scheduleTokenRefresh(res) {
        scheduleTokenRefreshId = setTimeout(() => {
            tokenExpired = false;
            res.status(200);
            res.json(getEndpointData('auth/user'));
        }, config.tokenRefreshDelayInSeconds * MILLISECONDS_IN_SECOND);
    }

    function scheduleDeauthorization() {
        setInterval(() => {
            authorized = false;
        }, config.unauthorizedAfterSeconds * MILLISECONDS_IN_SECOND);
    }

    scheduleDeauthorization();
    scheduleTokenExpiry();

    return (req, res, next) => {
        if (req.url === '/api/auth/refresh') {
            clearTimeout(scheduleTokenRefreshId);
            scheduleTokenRefresh(res);
            clearTimeout(scheduleTokenExpiryId);
            scheduleTokenExpiry();
        } else {
            if (!authorized) {
                authorized = true;
                res.sendStatus(401);
            } else if (tokenExpired) {
                res.status(406);
                res.json({
                    uuid: 'f67ee735-621b-436a-8a78-39034980f5a4',
                    code: 'EXPIRED_TOKEN',
                    message: 'Token expired.',
                    checks: null,
                });
            } else {
                next();
            }
        }
    };
}

module.exports = session;
