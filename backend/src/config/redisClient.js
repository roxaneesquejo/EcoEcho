const { createClient } = require('redis');

// Automatically configure socket options if it's an Upstash/Cloud instance
let redisConfig = {};

if (process.env.REDIS_URL) {
  redisConfig.url = process.env.REDIS_URL;

  // Upstash cloud endpoints require TLS. Let's force it if using public cloud instances
  if (process.env.REDIS_URL.includes('upstash.io')) {
    redisConfig.socket = {
      tls: true,
      rejectUnauthorized: false // Bypasses self-signed token checks on edge runtimes
    };
  }
} else {
  redisConfig.socket = {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
  };
}

const redisClient = createClient(redisConfig);

// Configure your existing reconnect logic on the client
redisClient.options = {
  ...redisClient.options,
  reconnectStrategy: (retries) => {
    // If it keeps failing in production, stop after 3 attempts so the server can bind to its port
    if (process.env.NODE_ENV === 'production' || process.env.DATABASE_URL) {
      if (retries > 3) {
        console.warn(' Giving up on Redis connection to let Express server bind to port.');
        return new Error('Redis connection timed out');
      }
    }
    return Math.min(retries * 100, 3000);
  }
};

// Intercept the error event cleanly so it does not trigger an unhandled exception crash
redisClient.on('error', (err) => {
  console.warn('Redis Connection Error handled gracefully:', err.message);
});

// Helper function to safely connect without crashing the app startup process
redisClient.safeConnect = async () => {
  try {
    // Set a quick execution timeout so it doesn't hang forever
    await Promise.race([
      redisClient.connect(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 4000))
    ]);
    console.log(' Redis cache online.');
  } catch (err) {
    console.warn('Skipping Redis initialization loop. Backend will query Supabase directly.');
  }
};

module.exports = redisClient;