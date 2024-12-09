const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "79293224",
  database: "likeme",
  allowExitOnIdle: true,
});

const agregarPost = async (titulo, url, descripcion) => {
  const consulta =
    "INSERT INTO posts values (DEFAULT, $1, $2, $3) RETURNING id"; // Add RETURNING id
  const values = [titulo, url, descripcion];
  try {
    const result = await pool.query(consulta, values);
    if (result.rowCount > 0) {
      const postId = result.rows[0].id;
      console.log("Post agregado con ID:", postId);
    } else {
      console.warn("Post no agregado. No se insertaron filas.");
    }
  } catch (error) {
    console.error("Error al agregar post:", error);
  }
};

const getPosts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  console.log(rows);
  return rows;
};

module.exports = { agregarPost, getPosts };
