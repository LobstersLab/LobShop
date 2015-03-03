'use strict';

var nodemailer = require('nodemailer');

module.exports = (function () {
    var emailSubject = 'Email from your YourWebSite';
    var serviceProvider = 'gmail';
    var ownerEmail = 'name@email.com';
    var ownerPassword = 'someverysecretpassword';

    var transporter = nodemailer.createTransport({
        service: serviceProvider,
        auth: {
            user: ownerEmail,
            pass: ownerPassword
        }
    });

    return {
        emailSubject: emailSubject,
        ownerEmail: ownerEmail,
        ownerPassword: ownerPassword,
        transporter: transporter
    };
})();