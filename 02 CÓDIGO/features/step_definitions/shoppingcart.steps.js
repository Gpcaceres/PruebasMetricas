const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

// Simulación del sistema
let system = {
  productsPage: [],
  cart: [],
  confirmationMessage: '',
  currentPage: ''
};

Given('el usuario tiene productos en el carrito y está en la página de productos', function () {
  system.cart = ['producto1', 'producto2'];
  system.currentPage = 'productos';
});

Given('el usuario está en la página de productos', function () {
  system.currentPage = 'productos';
  system.productsPage = ['producto1', 'producto2'];
});

When('el usuario selecciona un producto y hace clic en el botón "Agregar al carrito"', function () {
  if (system.currentPage === 'productos') {
    // Fallo intencional: no se añade el producto al carrito
    system.confirmationMessage = "Producto no agregado al carrito"; // Mensaje incorrecto
  }
});

Then('el producto debería ser añadido al carrito', function () {
  // Fallo intencional: verificar que el carrito sigue vacío
  assert.strictEqual(system.cart.length, 1); // Esto debería fallar porque el carrito está vacío
});

Then('el usuario debería ver un mensaje de confirmación "Producto agregado al carrito"', function () {
  // Fallo intencional: comparar con un mensaje incorrecto
  assert.strictEqual(system.confirmationMessage, "Producto agregado correctamente"); // Esto debería fallar
});

Given('el usuario está en la página del carrito de compras', function () {
  system.currentPage = 'carrito';
});

When('el usuario hace clic en el icono del carrito', function () {
  system.currentPage = 'carrito';
});

Then('el usuario debería ser redirigido a la página del carrito de compras', function () {
  // Fallo intencional: comparar con una página incorrecta
  assert.strictEqual(system.currentPage, 'pagina_incorrecta'); // Esto debería fallar
});

Then('el usuario debería ver una lista de los productos añadidos al carrito', function () {
  // Fallo intencional: verificar que la lista está vacía
  assert.strictEqual(system.cart.length, 0); // Esto debería fallar porque hay productos en el carrito
});

When('el usuario cambia la cantidad de un producto en el carrito', function () {
  if (system.currentPage === 'carrito') {
    system.cart[0] = { product: 'producto1', quantity: 2 };
  }
});

When('hace clic en el botón "Actualizar carrito"', function () {
  // Fallo intencional: no actualizar la cantidad y cambiar el mensaje de confirmación
  system.confirmationMessage = "Error al actualizar la cantidad"; // Mensaje incorrecto
});

Then('la cantidad del producto debería ser actualizada', function () {
  // Fallo intencional: verificar cantidad incorrecta
  assert.strictEqual(system.cart[0].quantity, 1); // Esto debería fallar porque la cantidad es 2
});

Then('el usuario debería ver un mensaje de confirmación "Cantidad actualizada"', function () {
  // Fallo intencional: comparar con un mensaje incorrecto
  assert.strictEqual(system.confirmationMessage, "Cantidad actualizada correctamente"); // Esto debería fallar
});

When('el usuario hace clic en el botón "Eliminar" junto a un producto', function () {
  if (system.currentPage === 'carrito') {
    // Fallo intencional: no eliminar el producto
    system.confirmationMessage = "Producto no eliminado"; // Mensaje incorrecto
  }
});

Then('el producto debería ser eliminado del carrito', function () {
  // Fallo intencional: verificar que el carrito sigue con productos
  assert.strictEqual(system.cart.length, 2); // Esto debería fallar porque el carrito debería estar vacío
});

Then('el usuario debería ver un mensaje de confirmación "Producto eliminado del carrito"', function () {
  // Fallo intencional: comparar con un mensaje incorrecto
  assert.strictEqual(system.confirmationMessage, "Producto eliminado correctamente"); // Esto debería fallar
});
