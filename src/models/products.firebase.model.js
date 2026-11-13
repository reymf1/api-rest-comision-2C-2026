import {
  readCatalog,
  writeCatalog,
} from "../repositories/catalog.repository.js"; //Importa las funciones readCatalog y writeCatalog del archivo catalog.repository.js ubicado en la carpeta repositories. Estas funciones permiten leer y escribir el catálogo de productos desde y hacia un archivo JSON, respectivamente, facilitando la gestión de los datos de productos en la aplicación.
import { db } from "../config/firebase.js"; //Importa la instancia de la base de datos de Firebase desde el archivo firebase.config.js ubicado en la carpeta config. Esto permite que el modelo de productos interactúe con la base de datos de Firebase para realizar operaciones de lectura y escritura en la colección de productos.
import { collection, addDoc, getDocs } from "firebase/firestore"; //Importa la función collection desde el módulo firebase/firestore. Esta función se utiliza para crear una referencia a una colección específica en la base de datos de Firebase, lo que permite realizar operaciones de lectura y escritura en esa colección.

const productsCollection = collection(db, "products"); //Define el nombre de la colección de productos en Firebase. Esto se utiliza para identificar la colección específica en la base de datos de Firebase donde se almacenarán los documentos de productos.

export const findAll = async (categoriaId) => {
  //const { productos } = await readCatalog();
  const snapshot = await getDocs(productsCollection); //
  const productos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); //Convierte los documentos del snapshot en un array de objetos de productos. Cada objeto contiene el ID del documento (doc.id) y los datos del documento (doc.data()). Esto permite trabajar con los productos como objetos JavaScript en lugar de documentos de Firebase.

  if (!categoriaId) {
    return productos;
  }

  return productos.filter((p) => p.categoriaId === parseInt(categoriaId));
};

export const findById = async (id) => {
  const { productos } = await readCatalog();
  return productos.find((p) => p.id === parseInt(id));
};

export const create = async ({ nombre, precio, categoriaId }) => {
  const productRef = await addDoc(productsCollection, {
    nombre,
    precio,
    categoriaId,
  }); //Utiliza la función addDoc para agregar un nuevo documento a la colección de productos en Firebase. Se pasa como argumento la referencia a la colección (productsCollection) y un objeto que contiene los datos del nuevo producto (name, price, categoryId). La función devuelve una referencia al documento recién creado (productRef), que incluye el ID generado automáticamente por Firebase para ese documento.

  return { id: productRef.id, nombre, precio, categoriaId }; //devuelve un objeto que representa el producto recién creado, incluyendo su ID generado automáticamente por Firebase. Esto permite que el controlador que llama a esta función pueda enviar la respuesta al cliente con los datos del nuevo producto, confirmando que la operación de creación fue exitosa y proporcionando al cliente la información más reciente del recurso.
};

export const update = async (id, { nombre, precio, categoriaId }) => {
  const { productos } = await readCatalog();

  const producto = productos.find((p) => p.id === parseInt(id));

  if (!producto) {
    throw new Error("Producto no encontrado");
  }

  producto.nombre = nombre;
  producto.precio = precio;
  producto.categoriaId = categoriaId;

  return producto; //Devuelve el objeto producto actualizado. Esto permite que el controlador que llama a esta función pueda enviar la respuesta al cliente con los datos actualizados del producto. En un entorno real, después de actualizar el producto en la base de datos, se devolvería el objeto actualizado para confirmar que la operación fue exitosa y proporcionar al cliente la información más reciente del recurso.
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
