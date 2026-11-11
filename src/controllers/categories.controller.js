import * as categoriesModel from "../models/categories.model.js";

const categorias = [
  { id: 1, nombre: "Tecnología" },
  { id: 2, nombre: "Hogar" },
];

export const getCategorias = async (req, res) => {
  try {
    res.json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las categorías" });
  }
};

export const createCategoria = async (req, res) => {
  try {
    const { nombre } = req.body ?? {};
    if (!nombre) {
      return res.status(422).json({ error: "Falta el nombre de la categoría" });
    }
    const nuevaCategoria = await categoriesModel.create({ nombre });
    categorias.push(nuevaCategoria);
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la categoría" });
  }
};

export const updateCategoria = async (req, res) => {
  try {
    const categoriaId = parseInt(req.params.id);
    const { nombre } = req.body ?? {};
    if (!nombre) {
      return res.status(422).json({ error: "Falta el nombre de la categoría" });
    }
    const categoria = await categoriesModel.update(categoriaId, { nombre });
    if (!categoria) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res.json(categoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la categoría" });
  }
};

export const deleteCategoria = async (req, res) => {
  try {
    const categoriaId = parseInt(req.params.id);
    const categoria = await categoriesModel.delete(categoriaId);
    if (!categoria) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res.json({ message: "Categoría eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la categoría" });
  }
};
