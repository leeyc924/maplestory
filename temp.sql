CREATE TABLE guild_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ocid TEXT UNIQUE NOT NULL,
  character_name TEXT NOT NULL,
  character_class TEXT NOT NULL,
  character_level INTEGER NOT NULL,
  character_image TEXT,
  guild_name TEXT DEFAULT '이브',
  joined_at DATE NOT NULL,
  previous_guild TEXT,
  permission TEXT DEFAULT '길드원',
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
  access_flag TEXT,
);

CREATE TABLE suro_ranking (
  id BIGSERIAL PRIMARY KEY,
  date DATE NOT NULL,
  guild_name VARCHAR(100) NOT NULL,
  guild_point INTEGER NOT NULL,
  ranking INTEGER NOT NULL,
);

