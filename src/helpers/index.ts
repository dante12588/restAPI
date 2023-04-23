import crypto from 'crypto';

const SECRET = 'MOJE-RESTAPI';

export const random = () => crypto.randomBytes(128).toString('base64');
export const authentications = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
};