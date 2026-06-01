const { createClient } = require('redis');

// Automatically prioritize the full connection URL string if available
const redisClient = process.env.REDIS_URL
  ? createClient({ url: process.env.REDIS_URL })
  : createClient({
    socket: {
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379,
    },
  });

// Configure your existing reconnect logic on the client
redisClient.options = {
  ...redisClient.options,
  reconnectStrategy: (retries) => {
    if (process.env.NODE_ENV === 'production' && retries > 0) {
      console.warn(' Production Redis connection aborted. Falling back to database storage.');
      return new Error('Redis connection disabled in production');
    }
    return Math.min(retries * 50, 2000);
  }
};

// Intercept the error event cleanly so it does not trigger an unhandled exception crash
redisClient.on('error', (err) => {
  console.warn('Redis Connection Error handled gracefully:', err.message);
});

// Helper function to safely connect without crashing the app startup process
redisClient.safeConnect = async () => {
  try {
    await redisClient.connect();
    console.log(' Redis cache online.');
  } catch (err) {
    console.warn(' Skipping Redis. Backend will query Supabase directly.');
  }
};

module.exports = redisClient;