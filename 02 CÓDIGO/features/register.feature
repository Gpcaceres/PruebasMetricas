Feature: RF-03_1 Registro de Usuarios

  Scenario: Registro con datos válidos
    Given el usuario está en la página de registro
    When el usuario ingresa un correo electrónico válido, una contraseña válida y repite la contraseña correctamente
    And hace clic en el botón "Crear cuenta"
    Then el usuario debería ser redirigido a una página de bienvenida o confirmación

  Scenario: Registro con datos inválidos
    Given el usuario está en la página de registro
    When el usuario ingresa un correo electrónico inválido o contraseñas que no coinciden
    And hace clic en el botón "Crear cuenta"
    Then el usuario debería ver un mensaje de error correspondiente, como "Correo electrónico inválido" o "Las contraseñas no coinciden"

  Scenario: Registro con una cuenta existente
    Given el usuario está en la página de registro
    When el usuario ingresa un correo electrónico que ya está registrado en el sistema
    And hace clic en el botón "Crear cuenta"
    Then el usuario debería ver un mensaje de error "Este correo electrónico ya está registrado"
