const nodemailer = require('nodemailer');

class MailService {

    constructor () {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            tls: { rejectUnauthorized: true },
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

 async sendActivationMail (adress, link) {
    await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to: adress,
        subject: `Активация аккаунта на ` + process.env.API_URL,
        text: ``,
        html:
        `
            <div>
                <h1>Для активации аккаунта перейдите по ссылке</h1>
                <a href="${link}">${link}</a>
            </div>
        `
    })
 }
}


module.exports = new MailService ();