// server/src/config/resend.js
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'FootballHub+ <noreply@footballhub.ma>',
            to,
            subject,
            html,
        });

        if (error) {
            console.error('Resend error:', error);
            throw error;
        }

        console.log('✅ Email sent:', data.id);
        return data;
    } catch (error) {
        console.error('Email error:', error);
        throw error;
    }
};

module.exports = { sendEmail, resend };
