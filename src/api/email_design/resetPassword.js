function resetPasswordEmail({ name, password }) {
    return `<!DOCTYPE html><html lang=en><meta charset=UTF-8><meta content="IE=edge"http-equiv=X-UA-Compatible><meta content="width=device-width,initial-scale=1"name=viewport><link href=https://fonts.googleapis.com rel=preconnect><link href=https://fonts.gstatic.com rel=preconnect crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap"rel=stylesheet><title>Chatsman</title><style>*{padding:0;margin:0;box-sizing:border-box}</style><body style="font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif;width:100%;padding:0;margin:0"><section class=page style=width:100%;background:#333;height:100vh;padding:25px;height:max-content;color:#fff><header style=width:100%;max-height:60px;height:60px;user-select:none><a href=https://chatsman.vercel.app style=display:flex;align-items:center;text-decoration:none;height:100%><div style=width:40px;height:40px><img alt=logo src=https://chatsman.vercel.app/favicon.png style=width:100%;height:100%></div><div class=heading style=font-weight:500;padding-left:10px;font-size:32px;color:#fff>Chatsman</div></a></header><article style="padding:10px 0 20px 0"><div class=title style="font-size:25px;padding:0 0 10px 0;user-select:none;color:#fff">Hi <span class=bold style=font-weight:500;color:#fff>${name}</span>,</div><div class=content><p style=color:#fff;font-size:18px>This is a temporary password for your account. Login with this password and then change your password by going on setting page.</div><article style="padding:10px 0;font-size:40px;font-weight:500">${password}</article><footer style=user-select:none;color:#fff;font-size:18px><p>Team Chatsman</footer><div class=notice style=font-size:14px;padding-top:10px;color:#aaa;user-select:none>You have received this email because we have received a forgot password request from your chatsman account.</div></article></section>`
}

module.exports = resetPasswordEmail