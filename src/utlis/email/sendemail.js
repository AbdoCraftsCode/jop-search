import nodemailer from "nodemailer"




export const sendemail = async ({
    to = [],
    subject = "",
    text = "",
    html = "",
    attachments = [],


} = {}) => {




    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });



    const info = await transporter.sendMail({
        from: `"yallabina 👻" <${process.env.EMAIL}>`,
        to,
        subject,
        text,
        html,
        attachments,
    });



}





