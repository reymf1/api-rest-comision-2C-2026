# API del Curso

Esta es una API simple para gestionar productos. Proporciona endpoints para obtener la lista de productos y detalles de cada producto.

## Endpoints

- `GET /api/productos`: obtiene la lista de todos los productos.

## Ejemplo de respuesta

```json
[
  { "id": 1, "nombre": "producto 1", "precio": 100 },
  { "id": 2, "nombre": "producto 2", "precio": 200 }
]
```

## CRUD

| CRUD   | Uso Habitual | Método HTTP Habitual |
| ------ | ------------ | -------------------- |
| Create | Crear        | POST                 |
| Read   | Leer         | GET                  |
| Update | Actualizar   | PUT / PATCH          |
| Delete | Eliminar     | DELETE               |

## Contrato de Productos

| Necesidad              | Método | Endpoint         | Respuesta Esperada             | Esado Principal Esperado |
| ---------------------- | ------ | ---------------- | ------------------------------ | ------------------------ |
| Listar Productos       | GET    | /api/productos   | Array JSON                     | 200                      |
| Obtener un Producto    | GET    | /api/productos/1 | Objeto Producto en JSON        | 200                      |
| Crear un Producto      | POST   | /api/productos   | Objeto Producto en JSON con ID | 201                      |
| Actualizar un Producto | DELETE | /api/producto/1  | Confirmación o Sin Contenido   | 200 o 204                |

/api/productos/{id} - Obtener un producto específico por su ID.
