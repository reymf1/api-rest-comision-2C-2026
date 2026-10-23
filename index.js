import express from "express";
import cors from "cors";

const app = express();
app.use(cors()); //Configura CORS (Cross-Origin Resource Sharing) para permitir solicitudes desde diferentes dominios. Esto es útil cuando el frontend y el backend están en dominios diferentes, ya que permite que el frontend haga solicitudes al backend sin restricciones de origen.

//middlewares
app.use(express.json()); //Configura Express para analizar el cuerpo de las solicitudes entrantes en formato JSON. Esto permite que los datos enviados en el cuerpo de la solicitud se puedan acceder como un objeto JavaScript a través de req.body.

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const categorias = [
  { id: 1, nombre: "Tecnología" },
  { id: 2, nombre: "Hogar" },
];

const productos = [
  { id: 1, nombre: "producto 1", precio: 100, categoriaId: 1 },
  { id: 2, nombre: "producto 2", precio: 200, categoriaId: 2 },
  { id: 3, nombre: "producto 3", precio: 300, categoriaId: 1 },
];

app.get("/", (req, res) => {
  res.send("Hola, mundo desde Express!");
});

app.get("/api/categorias", (req, res) => {
  res.json(categorias);
});

app.get("/api/productos", (req, res) => {
  const { categoriaId } = req.query; //req.query es un objeto que contiene los parámetros de consulta de la URL. Por ejemplo, si la URL es /api/productos?categoria=1, entonces req.query será { categoria: '1' }.

  if (!categoriaId) {
    return res.json(productos);
  }

  const productosFiltrados = productos.filter(
    (p) => p.categoriaId === parseInt(categoriaId),
  );
  return res.json(productosFiltrados);
});

app.post("/api/productos", (req, res) => {
  const { nombre, precio, categoriaId } = req.body;

  if (!nombre || !precio || !categoriaId) {
    return res.status(422).json({ error: "Faltan datos del producto" });
  }

  const nuevoProducto = {
    id: productos.length + 1,
    nombre,
    precio,
    categoriaId,
  };
  productos.push(nuevoProducto); //Agrega el nuevo producto al array productos. Esto simula la creación de un nuevo recurso en una base de datos. En un entorno real, aquí se haría una inserción en la base de datos.
  res.status(201).json(nuevoProducto); //Devuelve una respuesta con el código de estado 201 (Creado) y el objeto del nuevo producto en formato JSON. Esto indica que la creación del recurso fue exitosa y proporciona al cliente los detalles del nuevo producto creado.
  console.log("Producto creado:", productos); //Muestra en la consola del servidor un mensaje indicando que se ha creado un nuevo producto, junto con el array actualizado de productos. Esto es útil para fines de depuración y seguimiento de las operaciones realizadas en el servidor.
});

app.get("/api/productos/:id", (req, res) => {
  const productoId = parseInt(req.params.id); //req.params.id es un objeto que contiene los parámetros de la ruta. En este caso, estamos accediendo al parámetro id y convirtiéndolo a un número entero con parseInt para compararlo con el id de los productos.

  const producto = productos.find((p) => p.id === productoId);

  if (isNaN(productoId)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(producto);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
