const express = require('express');
const cors = require('cors');
const pool = require('./src/config/db');
const redisClient = require('./src/config/redisClient');
const {
  getLeaderboard,
  checkTierProgression,
} = require('./src/controllers/ecoController');
const authRoutes = require('./src/routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/api/leaderboard', getLeaderboard);
app.get('/api/tiers/progression', checkTierProgression);

app.get('/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    await redisClient.ping();
    res.json({ status: 'ok', postgres: true, redis: true });
  } catch (err) {
    res.status(503).json({ status: 'degraded', error: err.message });
  }
});

async function start() {
  await redisClient.connect();
  app.listen(PORT, () => {
    console.log(`EcoEcho API listening on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

// 1. GET /api/users/me -> Satisfies frontend user dashboard metrics
app.get('/api/users/me', (req, res) => {
  return res.status(200).json({
    id: 6,
    username: "JoanTest",
    first_name: "Joan",
    email: "joan@test.com",
    total_xp: 450,
    city: "Manila",
    tier_name: "sprout",
    streak_days: 3,
    profile_url: "https://via.placeholder.com/150"
  });
});

// 2. GET /api/challenges/daily -> Satisfies the gamified mission board header
app.get('/api/challenges/daily', (req, res) => {
  return res.status(200).json({
    title: "Carbon Footprint Reducer",
    description: "Unplug all phantom electronic installers and appliances for 12 hours straight."
  });
});

// 3. GET /api/feed/trending -> Satisfies the community social impact feed
app.get('/api/feed/trending', (req, res) => {
  return res.status(200).json([
    {
      id: 1,
      author_name: "Roxane Eco",
      author_profile_url: "https://via.placeholder.com/150",
      title: "Small Actions Matter!",
      content: "Just finished planting 3 clean saplings around the neighborhood today.",
      likes: 24,
      xp_awarded: 50,
      time_ago: "2 hours ago",
      image_url: null
    }
  ]);
});