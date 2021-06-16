import Cryptr from 'cryptr';

const cryptr = new Cryptr(process.env.JWT_SECRET || "");


export async function encrypts(text: string) {
    return cryptr.encrypt(text);
}