import express from "express";
import cors from "cors";
import productsRouter from "./src/routes/products.router.js";
import categoriesRouter from "./src/routes/categories.router.js";
import productsFirebaseRouter from "./src/routes/products.firebase.router.js";
//import categoriesFirebaseRouter from "./src/routes/categories.firebase.router.js";

const app = express();
app.use(cors()); //Configura CORS (Cross-Origin Resource Sharing) para permitir solicitudes desde diferentes dominios. Esto es útil cuando el frontend y el backend están en dominios diferentes, ya que permite que el frontend haga solicitudes al backend sin restricciones de origen.

//middlewares
app.use(express.json()); //Configura Express para analizar el cuerpo de las solicitudes entrantes en formato JSON. Esto permite que los datos enviados en el cuerpo de la solicitud se puedan acceder como un objeto JavaScript a través de req.body. Antes se usaba body-parser, pero a partir de Express 4.16.0, express.json() es parte del núcleo de Express y no requiere la instalación de un paquete adicional.

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Hola, mundo desde Express!");
});

app.use("/api/productos", productsRouter);//Configura la ruta base para las operaciones relacionadas con productos. Todas las solicitudes que comiencen con /api/productos serán manejadas por el router productsRouter, que contiene las rutas específicas para crear, leer, actualizar y eliminar productos.
app.use("/api/categorias", categoriesRouter);
app.use("/api/firebase/productos", productsFirebaseRouter);
//app.use("/api/firebase/categorias", categoriesFirebaseRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
