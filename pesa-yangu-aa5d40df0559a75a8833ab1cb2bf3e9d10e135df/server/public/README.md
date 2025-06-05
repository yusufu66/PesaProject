markdown
# Pesa Yangu Backend

## Setup
1. Ensure MySQL server is running.
2. Adjust credentials in `config/database.js` or set environment variables:
   - `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
3. Run SQL script to create database and tables:
   ```bash
   mysql -u root -p < db/create_tables.sql
   ```
4. Install Node.js dependencies if you plan to use the `initialize()` function:
   ```bash
   npm init -y
   npm install mysql2
   ```
5. In your application entrypoint (e.g., `index.js`), use:
   ```js
   const { initialize } = require('./config/database');
   
   (async () => {
     const pool = await initialize();
     // Now you can use pool.execute or pool.query...
   })();
   ```

## Tables Overview
- `users`: Stores all users with roles (`customer`, `mentor`, `admin`).
- `resources`: Learning materials added by mentors/admin.
- `sessions`: Available mentorship sessions created by mentors.
- `bookings`: Customer bookings linking `users` and `sessions`.