import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a PostgreSQL pool using environment variables
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'), // PostgreSQL default port is 5432
});

export const query = (text: string, params?: any) => pool.query(text, params);

// Function to check and create the table if it doesn't exist
export async function createOrdersTable() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS orders (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            full_name VARCHAR(255) NOT NULL,
            full_address TEXT NOT NULL,
            images_urls TEXT[], 
            frame_color VARCHAR(50),
            user_id VARCHAR(50),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        await query(createTableQuery);
        console.log('Orders table created or already exists');
    } catch (error) {
        console.error('Error creating orders table:', error);
    }
}
