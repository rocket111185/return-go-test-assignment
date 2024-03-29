export default () => ({
  platform: {
    shopify: {
      accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
      baseUrl: process.env.SHOPIFY_BASE_URL,
    },
  },
});
