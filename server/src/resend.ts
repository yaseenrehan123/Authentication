import { Resend } from "resend";
import { SendMailType } from "./types.js";

let resend: Resend;

export function initResend() {
    const resendApiKey: string | undefined = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
        throw new Error("RESEND API KEY NULL:" + resendApiKey);
    }
    console.log(resendApiKey);
    resend = new Resend(resendApiKey);
    console.log("RESEND INITALIZED!");
};

export async function sendMail({ message, address, subject }: SendMailType) {

    const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: address,
        subject: subject,
        html: message
    });

    if (error) {
        throw new Error("SEND MAIL FAILED!", { cause: error })
    };

    console.log(data);

}