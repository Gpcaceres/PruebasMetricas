const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

// Simulación del sistema
let system = {
  cart: [],
  orderCreated: false,
  confirmationMessage: '',
  shippingInfo: '',
  cartEmpty: false
};

Given('el usuario tiene productos en el carrito', function () {
  system.cart = ['producto1', 'producto2'];
});

When('el usuario hace clic en el botón "Realizar pedido"', function () {
  if (system.cart.length > 0) {
    system.proceedToCheckout = true;
  } else {
    system.proceedToCheckout = false;
  }
});

When('ingresa la información de envío requerida', function () {
  if (system.proceedToCheckout) {
    system.shippingInfo = 'Información de envío válida';
  }
});

When('hace clic en el botón "Confirmar pedido"', function () {
  if (system.shippingInfo !== '') {
    system.orderCreated = true;
    system.confirmationMessage = "Pedido realizado exitosamente";
    system.cart = [];
    system.cartEmpty = true;
  }
});

Then('el pedido debería ser creado en el sistema', function () {
  assert.strictEqual(system.orderCreated, true);
});

Then('el usuario debería ver un mensaje de confirmación "Pedido realizado exitosamente"', function () {
  assert.strictEqual(system.confirmationMessage, "Pedido realizado exitosamente");
});

Then('el carrito de compras debería estar vacío', function () {
  assert.strictEqual(system.cartEmpty, true);
});
