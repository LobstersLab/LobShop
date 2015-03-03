'use strict';

var nodemailer = require('nodemailer');

module.exports = (function () {
    var emailSubject = 'Email from KirsAuction';
    var serviceProvider = 'gmail';
    var ownerEmail = 'kirsauction@gmail.com';
    var ownerPassword = 'kirspass123';

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