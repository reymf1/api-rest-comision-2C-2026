import {
  readCatalog,
  writeCatalog,
} from "../repositories/catalog.repository.js";

// const categorias = [
//   { id: 1, nombre: "categoria 1" },
//   { id: 2, nombre: "categoria 2" },
// ];

export const findAll = async () => {
  const { categorias } = await readCatalog();
  return categorias;
};

export const findById = async (id) => {
  const { categorias } = await readCatalog();
  return categorias.find((c) => c.id === parseInt(id));
};

export const create = async ({ name }) => {
  const catalog = await readCatalog();

  const ids = categorias.map((c) => c.id);

  const newId = ids.length > 0 ? Math.max(...ids) + 1 : 1;

  const newCategory = { id: newId, nombre: name };

  catalog.categorias.push(newCategory);

  await writeCatalog(catalog);

  return newCategory;
};

export const update = async (id, { name }) => {
  const catalog = await readCatalog();
  const categoria = catalog.categorias.find((c) => c.id === parseInt(id));
  if (!categoria) {
    throw new Error("Categoría no encontrada");
  }
  categoria.nombre = name;

  await writeCatalog(catalog);

  return categoria;
};

export const remove = async (id) => {
  const catalog = await readCatalog();

  const index = catalog.categorias.findIndex((c) => c.id === parseInt(id));

  if (index === -1) {
    throw new Error("Categoría no encontrada");
  }

  const [removedCategory] = catalog.categorias.splice(index, 1);

  await writeCatalog(catalog);

  return removedCategory;
};
