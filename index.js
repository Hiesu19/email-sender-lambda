const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
const { generateHTMLResetPassword, generateHTMLNewUser } = require("./genHTML");
const ses = new SESClient({ region: "ap-southeast-1" });

const dotenv = require("dotenv");
dotenv.config();


const FROM_EMAIL = process.env.MAIL_FROM;
const TO_EMAIL = process.env.MAIL_TO;

const typeMap = {
	"reset-password": {
		title: "Bạn đã được đặt lại mật khẩu",
		templateFn: generateHTMLResetPassword,
		dataText: (email, password) => `Mật khẩu mới của bạn là: ${password}`,
	},
	"new-user": {
		title: "Tài khoản mới được tạo",
		templateFn: generateHTMLNewUser,
		dataText: (email, password) => `Xin chào ${email},\n\nMật khẩu của bạn là: ${password}`,
	},
	"reset-password-dev": {
		title: "Đặt lại mật khẩu (dev)",
		templateFn: generateHTMLResetPassword,
		dataText: (email, password) => `Mật khẩu của bạn là: ${password}`,
		overrideTo: TO_EMAIL,
	},
	"new-user-dev": {
		title: "Tài khoản mới được tạo (dev)",
		templateFn: generateHTMLNewUser,
		dataText: (email, password) => `Xin chào ${email},\n\nMật khẩu của bạn là: ${password}`,
		overrideTo: TO_EMAIL,
	},
};

exports.handler = async (event) => {
	for (const record of event.Records) {
		let body;
		try {
			body = JSON.parse(record.body);
		} catch (err) {
			console.error("Invalid message format:", err.message);
			continue;
		}

		const { type, datas } = body;


		if (type === "html" || type === "html-dev") {
			for (const item of datas) {
				const toMail = type === "html-dev" ? TO_EMAIL : item.toMail;
				const { subject, htmlBody } = item;

				const command = new SendEmailCommand({
					Source: FROM_EMAIL,
					Destination: { ToAddresses: [toMail] },
					Message: {
						Subject: { Data: subject, Charset: "UTF-8" },
						Body: {
							Html: { Data: htmlBody, Charset: "UTF-8" },
						},
					},
				});
				try {
					await ses.send(command);
					console.log(`HTML Email sent to ${toMail}`);
				} catch (err) {
					console.error(`Failed to send HTML email to ${toMail}:`, err.message);
				}
			}

		}
		else {
			const config = typeMap[type];
			for (const user of datas) {
				const { email, password } = user;
				const toEmail = config.overrideTo || email;
				const subject = config.title;
				const htmlBody = config.templateFn(email, password);

				const command = new SendEmailCommand({
					Source: FROM_EMAIL,
					Destination: { ToAddresses: [toEmail] },
					Message: {
						Subject: { Data: subject, Charset: "UTF-8" },
						Body: {
							Html: { Data: htmlBody, Charset: "UTF-8" },
							Text: {
								Data: config.dataText(email, password),
								Charset: "UTF-8",
							},
						},
					},
				});

				try {
					await ses.send(command);
					console.log(`Email sent to ${toEmail} - (${email}) (${type})`);
				} catch (err) {
					console.error(`Failed to send email to ${toEmail}  - (${email}):`, err.message);
				}
			}
		}
	}

	return { statusCode: 200 };
};
