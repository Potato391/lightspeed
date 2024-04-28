const express = require("express");
const helmet = require("helmet");

const app = express();

// Set up CSP using helmet
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"], // Allow sources from the same origin by default
      scriptSrc: ["'self'"], // Allow scripts from the same origin, but you can add other trusted sources here if needed
      // Add a 'none' policy for the specific script you want to block
      scriptSrc: [
        "'self'",
        "'none'", // Block all scripts from any source
        "/089d1bfdb4e54328a59574fb7ac4e473b32134ed9982a399929388d97e08f2dd/inject.js", // Block this specific script file
      ],
    },
  })
);

// Your other Express app setup and routes go here

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

module.exports = app;
