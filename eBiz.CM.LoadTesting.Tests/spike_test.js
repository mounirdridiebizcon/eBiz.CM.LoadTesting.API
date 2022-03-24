import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages: [
        { duration: '10s', target: 100 }, // below normal load
        { duration: '1m', target: 100 },
        { duration: '10s', target: 1400 }, // spike to 1400 users
        { duration: '3m', target: 1400 }, // stay at 1400 for 3 minutes
        { duration: '10s', target: 100 }, // scale down. Recovery stage.
        { duration: '3m', target: 100 },
        { duration: '10s', target: 0 }
    ],
};

export default function () {
    const BASE_URL = 'https://localhost:44314'; // make sure this is not production

    http.batch([
        ['GET', `${BASE_URL}/hello/`],
        ['GET', `${BASE_URL}/machine/`]
    ]);

    sleep(1);
}