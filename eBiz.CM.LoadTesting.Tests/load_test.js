import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages: [
        { duration: '5m', target: 100 },  // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
        { duration: '10m', target: 100 }, // stay at 100 users for 10 minutes
        { duration: '3m', target: 0 }     // ramp-down to 0 users
    ],
    thresholds: {
        'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

export default function () {
    const BASE_URL = 'https://localhost:44314'; // make sure this is not production

    http.batch([
        ['GET', `${BASE_URL}/hello/`],
        ['GET', `${BASE_URL}/machine/`]
    ]);

    sleep(1);
}