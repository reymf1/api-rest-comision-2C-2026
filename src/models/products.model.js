import {
  readCatalog,
  writeCatalog,
} from "../repositories/catalog.repository.js"; //Importa las funciones readCatalog y writeCatalog del archivo catalog.repository.js ubicado en la carpeta repositories. Estas funciones permiten leer y escribir el catálogo de productos desde y hacia un archivo JSON, respectivamente, facilitando la gestión de los datos de productos en la aplicación.

// const productos = [
//   { id: 1, nombre: "producto 1", precio: 100, categoriaId: 1 },
//   { id: 2, nombre: "producto 2", precio: 200, categoriaId: 2 },
//   { id: 3, nombre: "producto 3", precio: 300, categoriaId: 1 },
// ];

export const findAll = async (categoriaId) => {
  const { productos } = await readCatalog();

  if (!categoriaId) {
    return productos;
  }

  return productos.filter((p) => p.categoriaId === parseInt(categoriaId));
};

export const findById = async (id) => {
  const { productos } = await readCatalog();
  return productos.find((p) => p.id === parseInt(id));
};

export const create = async ({ name, price, categoryId }) => {
  const catalog = await readCatalog();
  const ids = productos.map((p) => p.id);
  const newId = ids.length > 0 ? Math.max(...ids) + 1 : 1; //Calcula el nuevo ID para el producto que se va a crear. Si hay productos existentes, se toma el ID máximo y se le suma 1 para generar un nuevo ID único. Si no hay productos, se asigna el ID 1 al nuevo producto. Esto asegura que cada producto tenga un identificador único en el catálogo.

  const nuevoProducto = {
    id: newId,
    nombre: name,
    precio: price,
    categoriaId: categoryId,
  };

  productos.push(nuevoProducto); //Agrega el nuevo producto al array productos. Esto simula la creación de un nuevo recurso en una base de datos. En un entorno real, aquí se haría una inserción en la base de datos.
  await writeCatalog(catalog); //Guarda el array actualizado de productos en el archivo catalog.json. Esto asegura que los cambios realizados (la adición del nuevo producto) se persistan en el almacenamiento. La función writeCatalog se encarga de convertir el objeto en una cadena JSON y escribirlo en el archivo correspondiente.

  return nuevoProducto;
};

export const update = async (id, { name, price, categoryId }) => {
  const { productos } = await readCatalog();

  const producto = productos.find((p) => p.id === parseInt(id));

  if (!producto) {
    throw new Error("Producto no encontrado");
  }

  producto.name = name;
  producto.price = price;
  producto.categoryId = categoryId;

  return producto; //Devuelve el objeto producto actualizado. Esto permite que el controlador que llama a esta función pueda enviar la respuesta al cliente con los datos actualizados del producto. En un entorno real, después de actualizar el producto en la base de datos, se devolvería el objeto actualizado para confirmar que la operación fue exitosa y proporcionar al cliente la informgit addación más reciente del recurso.
};
export const remove = async (id) => {
  const catalog = await readCatalog();

  const index = catalog.productos.findIndex((p) => p.id === parseInt(id));

  if (index === -1) {
    throw new Error("Producto no encontrado");
  }
  const [removedProduct] = catalog.productos.splice(index, 1); //El método splice se utiliza para eliminar un elemento del array catalog.productos en la posición index. El segundo argumento (1) indica que se debe eliminar un solo elemento. La función devuelve un array con los elementos eliminados, y mediante la desestructuración ([removedProduct]), se obtiene el primer (y único) elemento eliminado, que es el producto que se ha eliminado del catálogo.

  await writeCatalog(catalog);

  return removedProduct;
};
