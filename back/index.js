const express = require("express"); //Importamos express
const app = express(); //Instanciamos Expres
const fs = require("fs"); // Importamos fs
const cors = require("cors"); //Importamos cors
const port = 3000; // definimos el puerto

const {
  leerposts,
  escribirposts,
  agregarlikes,
  borrarposts,
} = require("./funciones"); // Importamos Funciones.js

app.listen(port, () => console.log("servidor encendido")); //Levantamos el servidor

app.use(express.json()); // middleware
app.use(cors()); //middleware

app.get("/posts", async (req, res) => {
  const obtenerpost = await leerposts();
  res.json(obtenerpost);
});

app.post("/posts", async (req, res) => {
  const { titulo, url, descripcion } = req.body;
  await escribirposts(titulo, url, descripcion);
  res.send("El post fue agregado");
});

app.put("/posts/like/:id", async (req, res) => {
  const id = req.params.id;
  await agregarlikes(id);
  res.send("Like agregado");
});

app.delete("/posts/:id", async (req, res) => {
  const id = req.params.id;
  await borrarposts(id);
  res.send("Post borrado");
});
