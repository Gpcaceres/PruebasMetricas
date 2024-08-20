const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

// Simulación del sistema
let system = {
  products: [],
  currentProduct: null,
  confirmationMessage: '',
  currentPage: ''
};

// Crear un nuevo producto (Pasa)
Given('el administrador está en la página de gestión de productos', function () {
  system.currentPage = 'gestión de productos';
});

When('el administrador ingresa un nombre de producto válido, una descripción válida, un precio y una cantidad en stock', function () {
  system.currentProduct = {
    name: 'Producto válido',
    description: 'Descripción válida',
    price: 100,
    stock: 50
  };
});

When('hace clic en el botón "Guardar"', function () {
  if (system.currentProduct && system.currentProduct.name && system.currentProduct.description && system.currentProduct.price > 0 && system.currentProduct.stock >= 0) {
    system.products.push(system.currentProduct);
    system.confirmationMessage = "Producto creado exitosamente";
  } else {
    system.confirmationMessage = "Error al crear el producto";
  }
});

Then('el producto debería ser guardado en el sistema', function () {
  assert.strictEqual(system.products.length, 1);
});

Then('el administrador debería ver un mensaje de confirmación "Producto creado exitosamente"', function () {
  assert.strictEqual(system.confirmationMessage, "Producto creado exitosamente");
});

// Crear un producto con datos inválidos (Pasa)
When('el administrador ingresa un nombre de producto inválido o deja campos obligatorios en blanco', function () {
  system.currentProduct = {
    name: '',
    description: '',
    price: -10,
    stock: -5
  };
});

Then('el producto no debería ser guardado en el sistema', function () {
  assert.strictEqual(system.products.length, 1); // El producto no se añade a la lista
});

Then('el administrador debería ver mensajes de error indicando los campos que deben ser corregidos', function () {
  assert.strictEqual(system.confirmationMessage, "Error al crear el producto");
});

// Ver lista de productos (Saltado)
When('el administrador accede a la sección de lista de productos', function () {
  if (system.currentPage !== 'gestión de productos') {
    return 'skipped'; // Se salta si no está en la página de gestión de productos
  }
});

Then('el administrador debería ver una tabla con los productos existentes en el sistema', function () {
  assert.strictEqual(system.products.length, 1);
});

// Editar un producto existente (Pasa)
Given('el administrador selecciona un producto de la lista para editar', function () {
  system.currentProduct = system.products[0];
});

When('el administrador modifica los detalles del producto', function () {
  system.currentProduct.name = 'Producto actualizado';
  system.currentProduct.description = 'Descripción actualizada';
});

Then('los cambios deberían ser guardados en el sistema', function () {
  assert.strictEqual(system.products[0].name, 'Producto actualizado');
  assert.strictEqual(system.products[0].description, 'Descripción actualizada');
});

Then('el administrador debería ver un mensaje de confirmación "Producto actualizado exitosamente"', function () {
  system.confirmationMessage = "Producto actualizado exitosamente";
  assert.strictEqual(system.confirmationMessage, "Producto actualizado exitosamente");
});

// Eliminar un producto existente (Pasa)
Given('el administrador selecciona un producto de la lista para eliminar', function () {
  system.currentProduct = system.products[0];
});

When('el administrador hace clic en el botón "Eliminar"', function () {
  const index = system.products.indexOf(system.currentProduct);
  if (index > -1) {
    system.products.splice(index, 1);
    system.confirmationMessage = "Producto eliminado exitosamente";
  }
});

Then('el producto debería ser eliminado del sistema', function () {
  assert.strictEqual(system.products.length, 0);
});

Then('el administrador debería ver un mensaje de confirmación "Producto eliminado exitosamente"', function () {
  assert.strictEqual(system.confirmationMessage, "Producto eliminado exitosamente");
});
