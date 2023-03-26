const pkg = require("./package.json");
const port = 9002;

module.exports = {
  apps: [
    {
      name: `${pkg.name}:${port}`,
      script: "app.js",
      watch: true,
      env: {
        PORT: port,
        NODE_ENV: "production",
      },
    },
  ],
};