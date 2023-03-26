const pkg = require("./package.json");
const port = 9003;

module.exports = {
  apps: [
    {
      name: `${pkg.name}:${port}`,
      script: "server.js",
      watch: true,
      env: {
        PORT: port,
        NODE_ENV: "production",
      },
    },
  ],
};
