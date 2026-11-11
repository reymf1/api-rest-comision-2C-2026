import { readFile, writeFile } from "node:fs/promises"; //Importa las funciones readFile y writeFile del módulo fs/promises de Node.js. Estas funciones permiten leer y escribir archivos de manera asíncrona utilizando promesas, lo que facilita la gestión de operaciones de E/S sin bloquear el hilo principal del programa.

const dataUrl = new URL("../../data/catalog.json", import.meta.url);

export const readCatalog = async () => {
  const catologJson = await readFile(dataUrl, "utf-8"); //Lee el contenido del archivo catalog.json ubicado en la ruta especificada por dataUrl. El contenido se lee como una cadena de texto en formato UTF-8.
  const catalog = JSON.parse(catologJson); //Convierte la cadena JSON leída del archivo en un objeto JavaScript utilizando JSON.parse. Esto permite trabajar con los datos del catálogo como un objeto en lugar de una cadena de texto, facilitando el acceso y manipulación de sus propiedades.
  return catalog;
};

export const writeCatalog = async (catalog) => {
  const catalogJson = JSON.stringify(catalog, null, 2); //Convierte el objeto catalog en una cadena JSON con una sangría de 2 espacios para mejorar la legibilidad. Esto es útil para almacenar datos estructurados en un archivo de texto, permitiendo que los datos sean fácilmente legibles y editables por humanos. Null se pasa como segundo argumento para indicar que no se desea aplicar ninguna transformación a los valores del objeto durante la conversión a JSON.
  await writeFile(dataUrl, catalogJson, "utf-8"); //Escribe la cadena JSON en el archivo catalog.json ubicado en la ruta especificada por dataUrl. El contenido se escribe en formato UTF-8, asegurando que los caracteres especiales se manejen correctamente. Esto permite que los cambios realizados en el objeto catalog se guarden de manera persistente en el archivo.
};
