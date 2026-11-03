import { readFile, writeFile } from "fs/promises";

const productos = [
  { id: 1, nombre: "producto 1", precio: 100, categoriaId: 1 },
  { id: 2, nombre: "producto 2", precio: 200, categoriaId: 2 },
  { id: 3, nombre: "producto 3", precio: 300, categoriaId: 1 },
];

const dataUrl = new URL("../../data/catalog.json", import.meta.url);

const readCatalog = async () => {
  const catologJson = await readFile(dataUrl, "utf-8"); //Lee el contenido del archivo catalog.json ubicado en la ruta especificada por dataUrl. El contenido se lee como una cadena de texto en formato UTF-8.
  catalog = JSON.parse(catologJson);
  return catalog;
};

const writeCatalog = async (catalog) => {
  const catalogJson = JSON.stringify(catalog, null, 2); //Convierte el objeto catalog en una cadena JSON con una sangría de 2 espacios para mejorar la legibilidad. Esto es útil para almacenar datos estructurados en un archivo de texto, permitiendo que los datos sean fácilmente legibles y editables por humanos. Null se pasa como segundo argumento para indicar que no se desea aplicar ninguna transformación a los valores del objeto durante la conversión a JSON.
  await writeFile(dataUrl, catalogJson, "utf-8"); //Escribe la cadena JSON en el archivo catalog.json ubicado en la ruta especificada por dataUrl. El contenido se escribe en formato UTF-8, asegurando que los caracteres especiales se manejen correctamente. Esto permite que los cambios realizados en el objeto catalog se guarden de manera persistente en el archivo.
};

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
  const maxId = Math.max(...ids); //Calcula el ID máximo actual en el array productos. Esto se hace para asignar un nuevo ID único al nuevo producto que se va a crear. Se utiliza Math.max para encontrar el valor máximo entre los IDs existentes.El spread operator (...) se utiliza para expandir el array ids en una lista de argumentos individuales para Math.max. Esto permite que Math.max compare todos los IDs y devuelva el valor máximo.
  const newId = maxId + 1;
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
