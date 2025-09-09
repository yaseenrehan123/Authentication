import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport/index.js";
let transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options>;
export async function initNodemailer() {
    transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "yr6190457@gmail.com",
            pass: process.env.GOOGLE_APP_PASSWORD,
        },
    });
    try {
        await transporter.verify()
    }
    catch (e) {
        console.error('initNodemailer() Failed! ', e);
        process.exit(1);
    }
}
export async function sendMail({ subject, email, message, address }: {
    subject: string,
    email: string,
    message: string,
    address: string
}) {
    try {
        transporter.sendMail({
            subject,
            from: process.env.GOOGLE_EMAIL,
            replyTo: email,
            html: message,
            to: address

        });
        return { success: true };
    }
    catch (e) {
        console.error('Email send failed!', e)
        return { success: false, error: e }
    }

}