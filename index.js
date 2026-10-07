import express from "express";

const app = express();

//middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const productos = [
  { id: 1, nombre: "producto 1", precio: 100 },
  { id: 2, nombre: "producto 2", precio: 200 },
];

app.get("/", (req, res) => {
  res.send("Hola, mundo desde Express!");
});

app.get("/api/productos", (req, res) => {
  res.json(productos); //Fuerza que devuelva productos como json. Igualmente, si ponía send devolvía json ya que express detecta que debe devolver json.
});

app.get("/api/productos/14", (req, res) => {
  res.send("Estás viendo el producto N° 14");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
