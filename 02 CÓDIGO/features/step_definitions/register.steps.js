const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

// Simulación del sistema
let system = {
  registeredUsers: ['existing@example.com'],
  currentEmail: '',
  currentPassword: '',
  confirmationPassword: '',
  errorMessage: '',
  currentPage: '',
  welcomePage: false
};

Given('el usuario está en la página de registro', function () {
  system.currentPage = 'registro';
  system.errorMessage = '';  // Reiniciar mensaje de error
  system.welcomePage = false; // Reiniciar página de bienvenida
});

When('el usuario ingresa un correo electrónico válido, una contraseña válida y repite la contraseña correctamente', function () {
  system.currentEmail = 'newuser@example.com';
  system.currentPassword = 'validpassword';
  system.confirmationPassword = 'validpassword';
});

When('el usuario ingresa un correo electrónico inválido o contraseñas que no coinciden', function () {
  system.currentEmail = 'invalidemail';
  system.currentPassword = 'password1';
  system.confirmationPassword = 'password2';
});

When('el usuario ingresa un correo electrónico que ya está registrado en el sistema', function () {
  system.currentEmail = 'existing@example.com';
  system.currentPassword = 'password';
  system.confirmationPassword = 'password';
});

When('hace clic en el botón "Crear cuenta"', function () {
  if (system.currentEmail === '' || system.currentPassword === '' || system.confirmationPassword === '') {
    system.errorMessage = "Este campo es obligatorio"; // Asignar mensaje de error si los campos están vacíos
  } else if (!system.currentEmail.includes('@') || system.currentPassword !== system.confirmationPassword) {
    if (!system.currentEmail.includes('@')) {
      system.errorMessage = "Correo electrónico inválido";
    } else if (system.currentPassword !== system.confirmationPassword) {
      system.errorMessage = "Las contraseñas no coinciden";
    }
  } else if (system.registeredUsers.includes(system.currentEmail)) {
    system.errorMessage = "Este correo electrónico ya está registrado";
  } else {
    system.registeredUsers.push(system.currentEmail);
    system.errorMessage = '';
    system.welcomePage = true;
  }
});

Then('el usuario debería ser redirigido a una página de bienvenida o confirmación', function () {
  assert.strictEqual(system.welcomePage, true);
});

Then('el usuario debería ver un mensaje de error correspondiente, como "Correo electrónico inválido" o "Las contraseñas no coinciden"', function () {
  // Cambiar el mensaje esperado para causar un fallo intencional
  assert.strictEqual(system.errorMessage, "Correo electrónico incorrecto o contraseñas no coinciden"); // Esto debería fallar
});

Then('el usuario debería ver un mensaje de error "Este campo es obligatorio" para cada campo vacío', function () {
  assert.strictEqual(system.errorMessage, "Este campo es obligatorio");
});

Then('el usuario debería ver un mensaje de error "Este correo electrónico ya está registrado"', function () {
  assert.strictEqual(system.errorMessage, "Este correo electrónico ya está registrado");
});
