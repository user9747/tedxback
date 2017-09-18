const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
//nodemailer
const nodemailer = require('nodemailer');
var config = {
   apiKey: "AIzaSyDvq3utO3-0lLsQgwveVAiysCRW16DQ7nM",
   authDomain: "tedxnode.firebaseapp.com",
   databaseURL: "https://tedxnode.firebaseio.com",
   projectId: "tedxnode",
   storageBucket: "tedxnode.appspot.com",
   messagingSenderId: "114370004312"
 };
// firebase.initializeApp(config);

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing

exports.sendMail = functions.database.ref('/messages/{pushId}/email')
  .onCreate(event => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport("SMTP",{
        service: 'Gmail',

        secure: false, // true for 465, false for other ports
        auth: {
            user: "padinju@gmail", // generated ethereal user
            pass: "albinantony"  // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
        to: 'padinju@gmail.com, abhisheknikunjam@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
  });
