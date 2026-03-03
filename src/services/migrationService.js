const fs = require('fs');
const csv = require('csv-parser');
const pool = require('../config/db');

async function runMigration() {

  const rows = [];

  fs.createReadStream('raw_data.csv')
    .pipe(csv())
    .on('data', (data) => rows.push(data))
    .on('end', async () => {

      for (const row of rows) {

        await pool.query(
            "INSERT INTO products (sku, name, unit_price, category_id, supplier_id) VALUES ($1, $2, $3, $4, $5)",
            [row.sku, row.name, row.unit_price, row.category_id, row.supplier_id]
            
        );

      }

      console.log("Migration completed");
    });
}

module.exports = { runMigration };
