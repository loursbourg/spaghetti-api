const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path: path.join(__dirname, '../../.env')});
const {env} = process;
const testDb = `${env.MONGODB_URL}-test`;

module.exports = {
  env: env.NODE_ENV,
  port: env.PORT,
  database: {
    url: env.NODE_ENV === 'test' ? testDb : env.MONGODB_URL,
  },
  jwt: {
    secret: env.JWT_SECRET,
    accessTokenExpirationMinutes: Number(env.JWT_ACCESS_EXPIRATION_MINUTES),
    refreshTokenExpirationDays: Number(env.JWT_REFRESH_EXPIRATION_DAYS),
  },
  email: {
    smtpHost: env.SMTP_HOST,
    smtpPort: Number(env.SMTP_PORT),
    smtpUsername: env.SMTP_USERNAME,
    smtpPassword: env.SMTP_PASSWORD,
    from: env.EMAIL_FROM,
    useTLS: env.EMAIL_USE_TLS === 'true',
  },
};
