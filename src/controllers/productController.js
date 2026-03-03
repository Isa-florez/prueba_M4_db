const pool = require('../config/db');

// Crear producto
exports.createProduct = async (req, res) => {
  const { sku, name, unit_price, category_id, supplier_id } = req.body;

  try {
    const result = await pool.query(
        "INSERT INTO products (sku, name, unit_price, category_id, supplier_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",   
        [sku, name, unit_price, category_id, supplier_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ver todos
exports.getProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ver uno
exports.getProductById = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE product_id = $1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Actualizar
exports.updateProduct = async (req, res) => {
  const { name, unit_price } = req.body;

  try {
    const result = await pool.query(
        "UPDATE products SET name = $1, unit_price = $2 WHERE product_id = $3 RETURNING *",
        [name, unit_price, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar (el trigger en PostgreSQL guarda el log automáticamente)
exports.deleteProduct = async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM products WHERE product_id = $1 RETURNING *",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};