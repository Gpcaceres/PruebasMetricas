Feature: RF-03_2 Autenticación de Usuarios

  Scenario: Login con credenciales válidas
    Given el usuario está en la página de login
    When el usuario ingresa su nombre de usuario y contraseña válidos
    And hace clic en el botón "Iniciar sesión"
    Then el usuario debería ser redirigido al panel de control

  Scenario: Login con credenciales inválidas
    Given el usuario está en la página de login
    When el usuario ingresa un nombre de usuario o contraseña inválidos
    And hace clic en el botón "Iniciar sesión"
    Then el usuario debería ver un mensaje de error "Nombre de usuario o contraseña incorrectos"

  Scenario: Login con campos vacíos
    Given el usuario está en la página de login
    When el usuario deja el nombre de usuario o la contraseña en blanco
    And hace clic en el botón "Iniciar sesión"
    Then el usuario debería ver un mensaje de error "Este campo es obligatorio"

  Scenario: Login con usuario bloqueado
    Given el usuario está en la página de login
    When el usuario ingresa el nombre de usuario y la contraseña de una cuenta bloqueada
    And hace clic en el botón "Iniciar sesión"
    Then el usuario debería ver un mensaje de error "Esta cuenta está bloqueada"
