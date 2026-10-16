module.exports = {
  apps: [
    {
      name: "torudeabi24",
      cwd: "/data02/virt57918/domeenid/www.torudeabi24.ee/htdocs",
      // "output: standalone" requires node .next/standalone/server.js
      // NOT "next start" — that command is incompatible with standalone mode
      script: ".next/standalone/server.js",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "0.0.0.0",
      },
    },
  ],
};