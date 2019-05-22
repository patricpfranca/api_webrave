const path = require("path");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const exphbs = require("express-handlebars");

const { host, port, user, pass } = require("../config/mail");

const transport = nodemailer.createTransport({
  host,
  port,
  auth: { user, pass }
});

const viewPath = path.resolve(__dirname, "./../../src/resources/mail");

transport.use(
  "compile",
  hbs({
    viewEngine: exphbs.create({
      partialsDir: path.resolve(viewPath, "partials")
    }),
    viewPath,
    extName: ".html"
  })
);

module.exports = transport;
