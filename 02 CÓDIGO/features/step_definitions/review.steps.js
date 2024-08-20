const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

// Simulación del sistema
let system = {
  rating: null,
  review: null,
  reviews: [],
  confirmationMessage: ''
};

Given('el usuario ha comprado un producto', function () {
  this.hasBoughtProduct = true;
});

Given('el usuario está en la página del producto', function () {
  this.onProductPage = true;
});

When('el usuario selecciona una calificación {int} estrellas', function (rating) {
  if (this.hasBoughtProduct && this.onProductPage) {
    system.rating = rating;
  }
});

When('hace clic en el botón "Enviar calificación"', function () {
  if (system.rating !== null) {
    system.confirmationMessage = "Calificación enviada exitosamente";
  }
});

Then('la calificación debería ser guardada en el sistema', function () {
  assert.strictEqual(system.rating, 4);
});

Then('el usuario debería ver un mensaje de confirmación "Calificación enviada exitosamente"', function () {
  assert.strictEqual(system.confirmationMessage, "Calificación enviada exitosamente");
});

When('el usuario escribe una reseña en el campo de texto', function () {
  if (this.hasBoughtProduct && this.onProductPage) {
    this.reviewContent = "Reseña del producto";
  }
});

When('hace clic en el botón "Enviar reseña"', function () {
  if (this.reviewContent) {
    system.review = this.reviewContent;
    system.reviews.push(this.reviewContent);
    system.confirmationMessage = "Reseña enviada exitosamente";
  }
});

Then('la reseña debería ser guardada en el sistema', function () {
  assert.strictEqual(system.review, "Reseña del producto");
});

Then('el usuario debería ver un mensaje de confirmación "Reseña enviada exitosamente"', function () {
  assert.strictEqual(system.confirmationMessage, "Reseña enviada exitosamente");
});

When('el usuario desplaza hacia la sección de reseñas', function () {
  this.viewingReviews = true;
});

Then('el usuario debería ver una lista de reseñas existentes para el producto', function () {
  assert.ok(this.viewingReviews && system.reviews.length > 0);
});

Given('el usuario ha escrito una reseña para un producto', function () {
  this.hasWrittenReview = true;
  system.review = "Reseña original del producto";
  system.reviews.push(system.review);
});

When('el usuario hace clic en el botón "Editar reseña"', function () {
  if (this.hasWrittenReview && this.onProductPage) {
    this.editingReview = true;
  }
});

When('modifica el contenido de la reseña', function () {
  if (this.editingReview) {
    this.modifiedReviewContent = "Reseña modificada del producto";
  }
});

When('hace clic en el botón "Guardar cambios"', function () {
  if (this.modifiedReviewContent) {
    system.review = this.modifiedReviewContent;
    system.confirmationMessage = "Reseña actualizada exitosamente";
  }
});

Then('los cambios en la reseña deberían ser guardados en el sistema', function () {
  assert.strictEqual(system.review, "Reseña modificada del producto");
});

Then('el usuario debería ver un mensaje de confirmación "Reseña actualizada exitosamente"', function () {
  assert.strictEqual(system.confirmationMessage, "Reseña actualizada exitosamente");
});

When('el usuario hace clic en el botón "Eliminar reseña"', function () {
  if (this.hasWrittenReview && this.onProductPage) {
    this.deletingReview = true;
  }
});

When('confirma la eliminación', function () {
  if (this.deletingReview) {
    this.reviewDeleted = true;
  }
});

// Este escenario fallará a propósito
Then('la reseña debería ser eliminada del sistema', function () {
  assert.strictEqual(this.reviewDeleted, false); // Fallará porque reviewDeleted es true
});

Then('el usuario debería ver un mensaje de confirmación "Reseña eliminada exitosamente"', function () {
  if (this.reviewDeleted) {
    system.reviews.pop();
    system.confirmationMessage = "Reseña eliminada exitosamente";
  }
  assert.strictEqual(system.confirmationMessage, "Reseña eliminada exitosamente");
});
