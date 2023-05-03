import nodemailer from 'nodemailer';

export const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'federicoepaglia@gmail.com',
        pass: 'apasbkxnpzxruenz'
    }
});