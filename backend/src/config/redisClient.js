const { createClient } = require('redis');

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    reconnectStrategy: (retries) => {
      if (process.env.NODE_ENV === 'production' && retries > 0) {
        console.warn(' Production Redis connection aborted. Falling back to database storage.');
        return new Error('Redis connection disabled in production');
      }
      return Math.min(retries * 50, 2000);
    }
  },
});

redisClient.on('error', (err) => {
  console.warn(' Redis Connection Error handled gracefully:', err.message);
});

redisClient.safeConnect = async () => {
  try {
    await redisClient.connect();
    console.log(' Redis cache online.');
  } catch (err) {
    console.warn(' Skipping Redis. Backend will query Supabase directly.');
  }
};

module.exports = redisClient;