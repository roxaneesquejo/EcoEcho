-- EcoEcho database schema
-- Run against ecoecho_db (see docker-compose.yml :) )

-- Tier progression graph
CREATE TABLE IF NOT EXISTS tiers (
    id              SERIAL PRIMARY KEY,
    tier_name       VARCHAR(100) NOT NULL UNIQUE,
    required_xp     INTEGER NOT NULL DEFAULT 0 CHECK (required_xp >= 0),
    parent_tier_id  INTEGER REFERENCES tiers (id) ON DELETE SET NULL
);

-- Users
CREATE TABLE IF NOT EXISTS users (
    id               SERIAL PRIMARY KEY,
    email            VARCHAR(255) NOT NULL UNIQUE,
    password_hash    VARCHAR(255) NOT NULL,
    username         VARCHAR(50) NOT NULL UNIQUE,
    total_xp         INTEGER NOT NULL DEFAULT 0 CHECK (total_xp >= 0),
    city             VARCHAR(100),
    province         VARCHAR(100),
    current_tier_id  INTEGER REFERENCES tiers (id) ON DELETE SET NULL
);

-- Missions
CREATE TABLE IF NOT EXISTS missions (
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    xp_reward   INTEGER NOT NULL DEFAULT 0 CHECK (xp_reward >= 0)
);

-- User mission completions
CREATE TABLE IF NOT EXISTS user_missions (
    user_id       INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    mission_id    INTEGER NOT NULL REFERENCES missions (id) ON DELETE CASCADE,
    completed_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, mission_id)
);

-- Activity audit trail
CREATE TABLE IF NOT EXISTS activity_logs (
    id                 SERIAL PRIMARY KEY,
    user_id            INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    action_description TEXT NOT NULL,
    created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Lookup indexes for foreign keys
CREATE INDEX IF NOT EXISTS idx_users_current_tier_id ON users (current_tier_id);
CREATE INDEX IF NOT EXISTS idx_tiers_parent_tier_id ON tiers (parent_tier_id);
CREATE INDEX IF NOT EXISTS idx_user_missions_mission_id ON user_missions (mission_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs (user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs (created_at);
