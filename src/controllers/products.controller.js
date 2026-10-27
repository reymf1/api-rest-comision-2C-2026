import * as productsModel from "../models/products.model.js";

export const getProductos = (req, res) => {
  const { categoriaId } = req.query; //req.query es un objeto que contiene los parámetros de consulta de la URL. Por ejemplo, si la URL es /api/productos?categoria=1, entonces req.query será { categoria: '1' }.

  const productosFiltrados = productsModel.findAll(categoriaId);
  res.json(productosFiltrados);
};

export const getProductoById = (req, res) => {
  const productoId = parseInt(req.params.id); //req.params.id es un objeto que contiene los parámetros de la ruta. En este caso, estamos accediendo al parámetro id y convirtiéndolo a un número entero con parseInt para compararlo con el id de los productos.

  const producto = productsModel.findById(productoId);

  if (isNaN(productoId)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(producto);
};

export const createProducto = (req, res) => {
  const { nombre, precio, categoriaId } = req.body;

  if (!nombre || !precio || !categoriaId) {
    return res.status(422).json({ error: "Faltan datos del producto" });
  }

  const nuevoProducto = productsModel.create(nombre, precio, categoriaId);

  res.status(201).json(nuevoProducto); //Devuelve una respuesta con el código de estado 201 (Creado) y el objeto del nuevo producto en formato JSON. Esto indica que la creación del recurso fue exitosa y proporciona al cliente los detalles del nuevo producto creado.
  console.log("Producto creado:", productos); //Muestra en la consola del servidor un mensaje indicando que se ha creado un nuevo producto, junto con el array actualizado de productos. Esto es útil para fines de depuración y seguimiento de las operaciones realizadas en el servidor.
};
