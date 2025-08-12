const generateHTMLNewUser = (email, password) => {
    return `
    <!DOCTYPE html>
    <html lang="vi">
      <head>
        <meta charset="UTF-8" />
        <title>Tài khoản người dùng mới</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: white; padding: 20px; border-radius: 8px;">
          <h2 style="color: #333;">Tài khoản người dùng mới đã được tạo</h2>
          <p>Xin chào <strong>${email}</strong>,</p>
          <p>Tài khoản mới của bạn đã được tạo trên hệ thống. Mật khẩu của bạn là:</p>
          <p style="font-size: 18px; font-weight: bold; color: #007BFF;">${password}</p>
          <p>Vui lòng đăng nhập và thay đổi mật khẩu để có thể vào hệ thống của công ty.</p>
          <hr style="margin-top: 30px;" />
          <p style="font-size: 12px; color: #888;">Đây là thư tự động. Vui lòng không trả lời email này.</p>
        </div>
      </body>
    </html>
  `;
}

const generateHTMLResetPassword = (email, password) => {
    return `
    <!DOCTYPE html>
    <html lang="vi">
      <head>
        <meta charset="UTF-8" />
        <title>Đặt lại mật khẩu thành công</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: white; padding: 20px; border-radius: 8px;">
          <h2 style="color: #333;">Đặt lại mật khẩu</h2>
          <p>Xin chào <strong>${email}</strong>,</p>
          <p>Mật khẩu mới của bạn là:</p>
          <p style="font-size: 18px; font-weight: bold; color: #007BFF;">${password}</p>
          <p>Vui lòng đăng nhập và thay đổi mật khẩu mới đảm bảo an toàn.</p>
          <hr style="margin-top: 30px;" />
          <p style="font-size: 12px; color: #888;">Đây là thư tự động. Vui lòng không trả lời email này.</p>
        </div>
      </body>
    </html>
  `;
};


module.exports = {
    generateHTMLResetPassword,
    generateHTMLNewUser,
};  