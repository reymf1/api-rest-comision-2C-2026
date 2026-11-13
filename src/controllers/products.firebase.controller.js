import * as productsModel from "../models/products.firebase.model.js"; //Importa todas las funciones exportadas desde el archivo products.firebase.model.js y las asigna al objeto productsModel. Esto permite acceder a las funciones del modelo de productos utilizando la notación de punto, por ejemplo, productsModel.findAll().
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
    const productoId = req.params.id; //No se convierte el parámetro de la ruta id en un número entero, ya que los IDs de los productos se manejan como cadenas en Firebase.

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
    const { nombre, precio, categoriaId } = req.body ?? {}; //req.body es un objeto que contiene los datos enviados en el cuerpo de la solicitud HTTP. En este caso, estamos desestructurando el objeto para obtener las propiedades nombre, precio y categoriaId. Dichas propiedades se asignan a variables locales que tienen los mismos nombres. Por eso, se puede simplificar la asignación. Los signos de interrogación y los corchetes vacíos (?? {}) se utilizan para asignar un valor predeterminado en caso de que req.body sea null o undefined, evitando así errores al intentar acceder a sus propiedades.Si el valor de la izquierda del operador ?? es null o undefined, se devuelve el valor de la derecha (en este caso, un objeto vacío {}). Esto asegura que siempre tengamos un objeto para desestructurar, evitando errores si req.body no está definido.
    console.log("Datos recibidos:", { nombre, precio, categoriaId });

    if (
      !nombre ||
      precio === undefined ||
      precio < 0 ||
      categoriaId === undefined ||
      categoriaId < 0
    ) {
      return res.status(422).json({ error: "Faltan datos del producto" });
    }

    const nuevoProducto = await productsModel.create({
      nombre,
      precio,
      categoriaId,
    }); //Se llama a la función create del modelo de productos (productsModel) para crear un nuevo producto en la base de datos. Se pasa un objeto con las propiedades nombre, precio y categoriaId, que son los datos necesarios para crear el producto. La función create se encarga de agregar el nuevo producto a la base de datos y devuelve el objeto del producto recién creado.

    res.status(201).json(nuevoProducto); //Devuelve una respuesta con el código de estado 201 (Creado) y el objeto del nuevo producto en formato JSON. Esto indica que la creación del recurso fue exitosa y proporciona al cliente los detalles del nuevo producto creado.

    console.log("Producto creado:", nuevoProducto); //Muestra en la consola del servidor un mensaje indicando que se ha creado un nuevo producto, junto con el array actualizado de productos. Esto es útil para fines de depuración y seguimiento de las operaciones realizadas en el servidor.
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el producto" });
  }
};

export const updateProducto = async (req, res) => {
  try {
    const productoId = req.params.id; //No se convierte el parámetro de la ruta id en un número entero, ya que los IDs de los productos se manejan como cadenas en Firebase.

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
      name: nombre,
      price: precio,
      categoryId: categoriaId,
    });

    if (!productoActualizado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(productoActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

export const deleteProducto = async (req, res) => {
  try {
    const productoId = req.params.id; //No se convierte el parámetro de la ruta id en un número entero, ya que los IDs de los productos se manejan como cadenas en Firebase.

    const removedProduct = await productsModel.remove(productoId);

    if (!removedProduct) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(removedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};
