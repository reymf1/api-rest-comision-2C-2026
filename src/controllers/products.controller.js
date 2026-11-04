import * as productsModel from "../models/products.model.js";

export const getProductos = async (req, res) => {
  try {
    const { categoriaId } = req.query; //req.query es un objeto que contiene los parámetros de consulta de la URL. Por ejemplo, si la URL es /api/productos?categoria=1, entonces req.query será { categoria: '1' }.

    const productosFiltrados = await productsModel.findAll(categoriaId);

    res.json(productosFiltrados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

export const getProductoById = async (req, res) => {
  try {
    const productoId = parseInt(req.params.id); //req.params.id es un objeto que contiene los parámetros de la ruta. En este caso, estamos accediendo al parámetro id y convirtiéndolo a un número entero con parseInt para compararlo con el id de los productos.

    if (isNaN(productoId)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const producto = await productsModel.findById(productoId);

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el producto" });
  }
};

export const createProducto = async (req, res) => {
  try {
    const { nombre, precio, categoriaId } = req.body ?? {}; //req.body es un objeto que contiene los datos enviados en el cuerpo de la solicitud HTTP. En este caso, estamos desestructurando el objeto para obtener las propiedades nombre, precio y categoriaId. Los signos de interrogación y los corchetes vacíos (?? {}) se utilizan para asignar un valor predeterminado en caso de que req.body sea null o undefined, evitando así errores al intentar acceder a sus propiedades.Si el valor de la izquierda del operador ?? es null o undefined, se devuelve el valor de la derecha (en este caso, un objeto vacío {}). Esto asegura que siempre tengamos un objeto para desestructurar, evitando errores si req.body no está definido.

    if (
      !nombre ||
      precio === undefined ||
      precio < 0 ||
      categoriaId === undefined ||
      categoriaId < 0
    ) {
      return res.status(422).json({ error: "Faltan datos del producto" });
    }

    const nuevoProducto = await productsModel.create(
      nombre,
      precio,
      categoriaId,
    );

    res.status(201).json(nuevoProducto); //Devuelve una respuesta con el código de estado 201 (Creado) y el objeto del nuevo producto en formato JSON. Esto indica que la creación del recurso fue exitosa y proporciona al cliente los detalles del nuevo producto creado.
    console.log("Producto creado:", nuevoProducto); //Muestra en la consola del servidor un mensaje indicando que se ha creado un nuevo producto, junto con el array actualizado de productos. Esto es útil para fines de depuración y seguimiento de las operaciones realizadas en el servidor.
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el producto" });
  }
};

export const updateProducto = async (req, res) => {
  const productoId = parseInt(req.params.id);
  const { nombre, precio, categoriaId } = req.body ?? {};

  if (
    !nombre ||
    precio === undefined ||
    precio < 0 ||
    categoriaId === undefined ||
    categoriaId < 0
  ) {
    return res.status(422).json({ error: "Faltan datos del producto" });
  }

  const productoActualizado = await productsModel.update(productoId, {
    nombre,
    precio,
    categoriaId,
  });
  res.json(productoActualizado);
};

export const deleteProducto = async (req, res) => {
  const productoId = parseInt(req.params.id);

  if (isNaN(productoId)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  const removedProduct = await productsModel.remove(productoId);

  if (!removedProduct) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(removedProduct);
};
