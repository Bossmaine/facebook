const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const { OAuth2 } = google.auth;

const { EMAIL, CLIENT_ID, CLIENT_SECRET, MAIL_REFRESH, MAIL_ACCESS } =
  process.env;

const auth = new OAuth2(CLIENT_ID, CLIENT_SECRET, MAIL_REFRESH, MAIL_ACCESS);

exports.sendVerificationEmail = (email, name, url) => {
  auth.setCredentials({
    refresh_token: MAIL_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  const smtp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: MAIL_REFRESH,
      accessToken,
    },
  });

  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: `Confirm your account`,
    html: `<div style=max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#3b5998>
        <img src=https://res.cloudinary.com/dmhcnhtng/image/upload/v1645134414/logo_cs1si5.png alt=logo style=width:30px>
        <span>Action required: Activate your account</span>
        </div>
        <div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto">
        <span>Hello ${name}, </span>
        <div style="padding:1.2rem 0">
        <span style="padding:1.5rem 0">
        You recently created an account on our service. To complete your registration, please confirm your account.</span>
        </div>
        <a href=${url} target=_blank style="width:200px;padding:10px 15px;background:#3b5998;color:#fff;text-decoration:none;font-weight:600">Confirm your account</a>
        <br>
        <div style=padding-top:20px>
        <span style="margin:1.5rem 0;color:#898f9c">
        Our Service allows you to stay in touch with all your friends, once registered, you can share photos, organize events and much more.
        </span>
        </div>
        </div>`,
  };
  smtp.sendMail(mailOptions, (error, res) => {
    if (error) {
      return error;
    }
    return res;
  });
};
