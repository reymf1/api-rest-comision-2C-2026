const productos = [
  { id: 1, nombre: "producto 1", precio: 100, categoriaId: 1 },
  { id: 2, nombre: "producto 2", precio: 200, categoriaId: 2 },
  { id: 3, nombre: "producto 3", precio: 300, categoriaId: 1 },
];

export const findAll = (categoriaId) => {
  if (!categoriaId) {
    return res.json(productos);
  }

  return productos.filter((p) => p.categoriaId === parseInt(categoriaId));
};

export const findById = (id) => {
  return productos.find((p) => p.id === parseInt(id));
};

export const create = (name, price, categoryId) => {
  const nuevoProducto = {
    id: productos.length + 1,
    nombre: name,
    precio: price,
    categoriaId: categoryId,
  };

  productos.push(nuevoProducto); //Agrega el nuevo producto al array productos. Esto simula la creación de un nuevo recurso en una base de datos. En un entorno real, aquí se haría una inserción en la base de datos.

  return nuevoProducto;
};
