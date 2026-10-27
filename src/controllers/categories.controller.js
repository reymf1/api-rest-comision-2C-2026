const categorias = [
  { id: 1, nombre: "Tecnología" },
  { id: 2, nombre: "Hogar" },
];

export const getCategorias = (req, res) => {
  res.json(categorias);
};
