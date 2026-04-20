import ImageKit from '@imagekit/nodejs';
import config from '../config/config.js';

const client = new ImageKit({
    publicKey: config.imagekitPublicKey,
    privateKey: config.imagekitPrivateKey,
    // urlEndpoint: 'https://ik.imagekit.io/snitch'
});

export const uploadFile = async (buffer, fileName, folder = "snitch") => {
    const result = await client.files.upload({
        file: await ImageKit.toFile(buffer),
        fileName,
        folder,
        transformation: {
            pre: "q-80"
        }
    });
    return result;
};