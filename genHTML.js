const generateHTMLNewUser = (email, password) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>New User Account</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: white; padding: 20px; border-radius: 8px;">
          <h2 style="color: #333;">New User Account Created</h2>
          <p>Hello <strong>${email}</strong>,</p>
          <p>Your new account has been created. Your password is:</p>
          <p style="font-size: 18px; font-weight: bold; color: #007BFF;">${password}</p>
          <p>Please log in and change your password immediately for security.</p>
          <hr style="margin-top: 30px;" />
          <p style="font-size: 12px; color: #888;">This is an automated message. Please do not reply.</p>
        </div>
      </body>
    </html>
  `;
}

const generateHTMLResetPassword = (email, password) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Reset Password</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: white; padding: 20px; border-radius: 8px;">
          <h2 style="color: #333;">Reset Password</h2>
          <p>Hello <strong>${email}</strong>,</p>
          <p>Your new password is:</p>
          <p style="font-size: 18px; font-weight: bold; color: #007BFF;">${password}</p>
          <p>Please log in and change your password immediately for security.</p>
          <hr style="margin-top: 30px;" />
          <p style="font-size: 12px; color: #888;">This is an automated message. Please do not reply.</p>
        </div>
      </body>
    </html>
  `;
};

module.exports = {
    generateHTMLResetPassword,
    generateHTMLNewUser,
};  