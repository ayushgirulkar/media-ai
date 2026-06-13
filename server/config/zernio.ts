import {Zernio} from '@zernio/node';

const zernio = new Zernio({apiKey: process.env.ZERNIO_API_KEY || "",
    baseURL: "https://zernio.com/api"

});

export default zernio; // uses ZERNIO_API_KEY env var