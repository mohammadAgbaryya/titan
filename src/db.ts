import { Pool } from 'pg';

// Create a PostgreSQL pool
const pool = new Pool({
    user: 'your_pg_user',
    host: 'localhost',
    database: 'your_database',
    password: 'your_password',
    port: 5432, // default PostgreSQL port
});

export const query = (text: string, params?: any) => pool.query(text, params);
