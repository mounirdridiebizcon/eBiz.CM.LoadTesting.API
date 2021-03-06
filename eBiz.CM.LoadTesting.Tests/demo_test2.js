import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    vus: 50,
    duration: '30s'
};

const API_BASE_URL = 'https://test-api.k6.io';

export default function () {
    http.batch([
        ['GET', `${API_BASE_URL}/public/crocodiles/1/`],
        ['GET', `${API_BASE_URL}/public/crocodiles/2/`],
        ['GET', `${API_BASE_URL}/public/crocodiles/3/`],
        ['GET', `${API_BASE_URL}/public/crocodiles/4/`],
    ]);

    sleep(1);
}