const nodemailer = require("nodemailer");
const path = require('path');
const hbs = require('nodemailer-express-handlebars');
const viewPath  = path.join(__dirname, './htmlTemplates')

const sendEmail = (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,  //smtp.gmail.com for google
    port: Number(process.env.SMTP_PORT), //465 for google
    auth: {
      user: process.env.SMTP_EMAIL, //your google email
      pass: process.env.SMTP_PASSWORD, //app password 
    },
  });

  //if your are reading templates from htmltemplates folder
  /*
  transporter.use('compile', hbs({
    viewEngine: {
        defaultLayout: false
    },
    viewPath: `${viewPath}`
  }))  
  */


  const mailOptions = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: `<b>Hey there! 👋</b><br> ${options.message}`,
    /*
    if you want to use a template
    context: { 
        options: options
    },
    template: "message" 
    */
  };

  transporter.sendMail(mailOptions, function (error, success) {
    if (error) console.log(error);
    console.log('Mail Sent Successfully')
  });
};

module.exports = sendEmail;
