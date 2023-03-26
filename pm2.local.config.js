const pkg = require("./package.json");
const port = 3007;

module.exports = {
  apps: [
    {
      name: `${pkg.name}:${port}`,
      script: "./node_modules/@vue/cli-service/bin/vue-cli-service.js",
      args: "serve",
      watch: false,
      env: {
        PORT: port,
        NODE_ENV: "development",
      },
    },
  ],
};
