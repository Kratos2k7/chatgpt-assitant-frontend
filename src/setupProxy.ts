import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function(app: any) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://canvas.instructure.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api/v1' // Rewrite the URL to match the target server's API endpoint
      },
      secure: false // Set to true if the target server uses HTTPS
    })
  );
};