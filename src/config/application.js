const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path: path.join(__dirname, '../../.env')});
const {env} = process;

module.exports = {
  env: env.NODE_ENV,
  port: env.PORT,
  database: {
    url: env.MONGODB_URL,
  },
  jwt: {
    secret: env.JWT_SECRET,
    accessTokenExpirationMinutes: env.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshTokenExpirationDays: env.JWT_REFRESH_EXPIRATION_DAYS,
  },
  email: {
    smtpHost: env.SMTP_HOST,
    smtpPort: env.SMTP_PORT,
    smtpUsername: env.SMTP_USERNAME,
    smtpPassword: env.SMTP_PASSWORD,
    from: env.EMAIL_FROM,
  },
};
