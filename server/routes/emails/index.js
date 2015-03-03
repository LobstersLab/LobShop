var express = require('express');
var router = express.Router();

var mailConfig = mailConfig = require('./../../../config/nodemailer');

module.exports = (function () {
    // TODO: Add EmailsController and persist the email in the database.
    // TODO: Create an Email model and Emails API with repository

    router.route('/')
        .post(function (req, res) {
            var data = req.body;

            mailConfig.transporter.sendMail({
                from: data.senderEmail,
                to: mailConfig.ownerEmail,
                subject: mailConfig.emailSubject,
                text: 'From ' + data.sender + '(' + data.senderEmail + '), \n' + data.message
            });

            res.status(200);
            res.json({
                success: true,
                message: 'Email sended successfully'
            });
        });

    return router;
})();