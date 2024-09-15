const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Lula2024",
  database: "likeme",
  allowExitOnIdle: true,
});

const leerposts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts;");
  return rows;
};

const escribirposts = async (titulo, url, descripcion) => {
  const consulta = "INSERT INTO posts VALUES(DEFAULT,$1,$2,$3,0)";
  const values = [titulo, url, descripcion];
  await pool.query(consulta, values);
  console.log("Post agregado");
};

const agregarlikes = async (id) => {
  const consulta = "UPDATE posts SET likes = (likes + 1) WHERE id=$1";
  const values = [id];
  await pool.query(consulta, values);
  console.log("Valor cambiado");
};

const borrarposts = async (id) => {
  const consulta = "DELETE FROM posts WHERE id = $1";
  const values = [id];
  await pool.query(consulta, values);
  console.log("Valor eliminado");
};

module.exports = { leerposts, escribirposts, agregarlikes, borrarposts };
