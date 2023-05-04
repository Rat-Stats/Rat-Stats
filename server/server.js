const path = require('path');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

const sqlRouter = require('./routes/sqlRouter.js');
const oaRouter = require('./routes/oaRouter.js');
const userRouter = require('./routes/userRouter.js');
mongoose.connect(process.env.MDB_URI);

const PORT = 3000;

// Parse incoming data in request body or cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // “extended” allows for rich objects and arrays to be encoded into the URL-encoded format
app.use(cookieParser());

// Routing for oauth endpoint
app.use('/oauth', oaRouter);

// Routing for sql endpoint to query users, rats,sighting tables
app.use('/sql', sqlRouter);

// Routing for user login and register
app.use('/user', userRouter);

// Routes for serving static files in production mode
/*
  The following can be toggled off in development mode, since devServer automatically 
  serves transpiled files from memory for the '/' endpoint. 
  
  Catchall static routing for '/' (i.e. 'app.use(express.static(...))') seems to break 
  React Router routing. Haven't found solution other than hardcoding endpoints for 
  individual build files. Even with 'historyApiFallback: true' AND hardcoded proxy endpoints 
  inside 'webpack.config.js', 'app.use(express.static(...))' will try to route requests 
  for ALL routes, including React Router routes. Express server and React Router endpoints
  must not overlap, or the former will break the latter.
*/
// app.use('/bundle.js', (req, res) => {
// 	console.log('Serving bundle.js');
// 	res.status(200).sendFile(path.join(__dirname, '../build/bundle.js'));
// });

// app.use('/styles.css', (req, res) => {
// 	console.log('Serving styles.css');
// 	res.status(200).sendFile(path.join(__dirname, '../build/styles.css'));
// });

// app.use('/', (req, res) => {
// 	console.log('Serving index.html');
// 	res.status(200).sendFile(path.join(__dirname, '../build/index.html'));
// });

// begin email experiment
const nodemailer = require('nodemailer');
var myemail = process.env.SENDER_EMAIL;
var mypassword = process.env.APPLICATION_PASSWORD;

function sendEmail({ recipient_email, OTP }) {
	return new Promise((resolve, reject) => {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: myemail,
				pass: mypassword,
			},
		});

		const mail_configs = {
			from: myemail,
			to: recipient_email,
			subject: 'KODING 101 PASSWORD RECOVERY',
			html: `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>CodePen - OTP Email Template</title>
  
</head>
<body>
<!-- partial:index.partial.html -->
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Koding 101</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing Koding 101. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
    <p style="font-size:0.9em;">Regards,<br />Koding 101</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Koding 101 Inc</p>
      <p>1600 Amphitheatre Parkway</p>
      <p>California</p>
    </div>
  </div>
</div>
<!-- partial -->
  
</body>
</html>`,
		};
		transporter.sendMail(mail_configs, function (error, info) {
			if (error) {
				console.log(error);
				return reject({ message: `An error has occured` });
			}
			return resolve({ message: 'Email sent succesfuly' });
		});
	});
}

app.get('/email', (req, res) => {
	sendEmail()
		.then((response) => res.send(response.message))
		.catch((error) => res.status(500).send(error.message));
});
// end email experiment

// Global error handling
////// Create default error object
const defaultErr = {
	log: 'A middleware error occured.',
	status: 400,
	message: 'Invalid client request.',
};
////// Global error handler
app.use((err, req, res, next) => {
	// Create error object based on err
	const errorObj = Object.assign({}, defaultErr, err);
	// Log error to terminal
	console.log(errorObj.log);
	// Send error message to client
	res.status(errorObj.status).json(errorObj.message);
});

// Start server
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}...`);
});
