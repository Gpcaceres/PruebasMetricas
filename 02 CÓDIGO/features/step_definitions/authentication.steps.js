const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

// Simulación del sistema
let system = {
  users: {
    validUser: { password: 'validpassword', blocked: false },
    blockedUser: { password: 'blockedpassword', blocked: true }
  },
  currentUsername: '',
  currentPassword: '',
  errorMessage: '',
  currentPage: '',
  isLoggedIn: false,
  isBlocked: false
};

Given('el usuario está en la página de login', function () {
  system.currentPage = 'login';
  system.errorMessage = '';
  system.isLoggedIn = false;
  system.isBlocked = false;
});

When('el usuario ingresa su nombre de usuario y contraseña válidos', function () {
  system.currentUsername = 'validUser';
  system.currentPassword = 'validpassword';
});

When('el usuario ingresa un nombre de usuario o contraseña inválidos', function () {
  system.currentUsername = 'invalidUser';
  system.currentPassword = 'invalidpassword';
});

When('el usuario deja el nombre de usuario o la contraseña en blanco', function () {
  system.currentUsername = '';
  system.currentPassword = '';
});

When('el usuario ingresa el nombre de usuario y la contraseña de una cuenta bloqueada', function () {
  system.currentUsername = 'blockedUser';
  system.currentPassword = 'blockedpassword';
});

When('hace clic en el botón "Iniciar sesión"', function () {
  if (system.currentUsername === '' || system.currentPassword === '') {
    system.errorMessage = "Este campo es obligatorio";
  } else if (system.users[system.currentUsername]) {
    if (system.users[system.currentUsername].blocked) {
      system.errorMessage = "Esta cuenta está bloqueada";
      system.isBlocked = true;
    } else if (system.users[system.currentUsername].password === system.currentPassword) {
      system.isLoggedIn = true;
    } else {
      system.errorMessage = "Nombre de usuario o contraseña incorrectos";
    }
  } else {
    system.errorMessage = "Nombre de usuario o contraseña incorrectos";
  }
});

Then('el usuario debería ser redirigido al panel de control', function () {
  assert.strictEqual(system.isLoggedIn, true);
});

Then('el usuario debería ver un mensaje de error "Nombre de usuario o contraseña incorrectos"', function () {
  assert.strictEqual(system.errorMessage, "Nombre de usuario o contraseña incorrectos");
});

Then('el usuario debería ver un mensaje de error "Este campo es obligatorio"', function () {
  assert.strictEqual(system.errorMessage, "Este campo es obligatorio");
});

Then('el usuario debería ver un mensaje de error "Esta cuenta está bloqueada"', function () {
  assert.strictEqual(system.errorMessage, "Esta cuenta está bloqueada");
});
