module.exports = {
  host: process.env.NODE_HOST || 'localhost', // Define your host from 'package.json'
  port: process.env.PORT,
  app: {
    htmlAttributes: { lang: 'en' },
    title: 'Thaivivat exam',
    titleTemplate: 'Thaivivat exam - %s',
    meta: [
      {
        name: 'description',
        content: 'The exam for thaivivat.',
      },
    ],
  },
};
