Feature: RF-01 Gestión de Productos

  Scenario: Crear un nuevo producto
    Given el administrador está en la página de gestión de productos
    When el administrador ingresa un nombre de producto válido, una descripción válida, un precio y una cantidad en stock
    And hace clic en el botón "Guardar"
    Then el producto debería ser guardado en el sistema
    And el administrador debería ver un mensaje de confirmación "Producto creado exitosamente"

  Scenario: Crear un producto con datos inválidos
    Given el administrador está en la página de gestión de productos
    When el administrador ingresa un nombre de producto inválido o deja campos obligatorios en blanco
    And hace clic en el botón "Guardar"
    Then el producto no debería ser guardado en el sistema
    And el administrador debería ver mensajes de error indicando los campos que deben ser corregidos

  Scenario: Ver lista de productos
    Given el administrador está en la página de gestión de productos
    When el administrador accede a la sección de lista de productos
    Then el administrador debería ver una tabla con los productos existentes en el sistema

  Scenario: Editar un producto existente
    Given el administrador está en la página de gestión de productos
    And el administrador selecciona un producto de la lista para editar
    When el administrador modifica los detalles del producto
    And hace clic en el botón "Guardar"
    Then los cambios deberían ser guardados en el sistema
    And el administrador debería ver un mensaje de confirmación "Producto actualizado exitosamente"

  Scenario: Eliminar un producto existente
    Given el administrador está en la página de gestión de productos
    And el administrador selecciona un producto de la lista para eliminar
    When el administrador hace clic en el botón "Eliminar"
    Then el producto debería ser eliminado del sistema
    And el administrador debería ver un mensaje de confirmación "Producto eliminado exitosamente"
