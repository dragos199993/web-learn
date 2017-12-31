import nodemailer from 'nodemailer';

const from = "'Questioner' <info@nedsilon.com>"

function setup(){
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 2525,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
}


export function sendConfirmationEmail(user){
    console.log(user);
    const transport = setup();
    const email = {
        from,
        to: user.email,
        subject: 'Welcome to questioner',
        text: 'Welcome to this application, please confirm your email ' + user.generateConfirmationUrl()
    }

    transport.sendMail(email);
}


export function sendResetPasswordEmail(user){
    const transport = setup();
    const email = {
        from,
        to: user.email,
        subject: 'Reset password',
        text: 'To reset password follow this link ' + user.generateResetPasswordLink()
    }

    transport.sendMail(email);
}


export function sendChangeAlert(user){
    const transport = setup();
    const email = {
        from,
        to: user.email,
        subject: 'Your password has been changed',
        text: 'Your password was recently changed. If it wasn\'t you please contact us!'
    }
    transport.sendMail(email);
}