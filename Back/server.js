const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuración de PostgreSQL
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "likeme",
  password: "79293224", //
  port: 5432, // Puerto por defecto de PostgreSQL
});

// Ruta GET para obtener todos los posts
app.get("/posts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los posts" });
  }
});

// Ruta POST para agregar un nuevo post
app.post("/posts", async (req, res) => {
  const { titulo, img, descripcion } = req.body;

  if (!titulo || !img || !descripcion) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, 0) RETURNING *",
      [titulo, img, descripcion]
    );
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al agregar el post" });
  }
});

// Ruta PUT para incrementar los likes de un post
app.put("/posts/:id/like", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Post no encontrado" });
    }
    return res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al incrementar los likes" });
  }
});

// Ruta DELETE para eliminar un post
app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM posts WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Post no encontrado" });
    }
    return res.json({ message: "Post eliminado", post: result.rows[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al eliminar el post" });
  }
});

// Ruta PUT para editar un post
app.put("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo, img, descripcion } = req.body;

  if (!titulo || !img || !descripcion) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const result = await pool.query(
      "UPDATE posts SET titulo = $1, img = $2, descripcion = $3 WHERE id = $4 RETURNING *",
      [titulo, img, descripcion, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Post no encontrado" });
    }
    return res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al editar el post" });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
