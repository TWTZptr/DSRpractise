export default () => ({
  APP: {
    HOST: process.env.APP_HOST,
    PORT: +process.env.APP_PORT,
  },
  DB: {
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DB_DATABASE,
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
  },
});
