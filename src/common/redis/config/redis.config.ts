export default () => ({
  redis: {
    secret: process.env.SECRET_KEY,
    signOption: {
      host: process.env.DB_HOST,
      port: process.env.DB_REDIS_PORT,
      auth_pass: process.env.DB_REDIS_PASSWORD,
    },
  },
});
