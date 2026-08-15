const { Pool } = require("pg");

require("dotenv").config();

// ከ Supabase ዳታቤዝ ጋር ማገናኛ setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;
