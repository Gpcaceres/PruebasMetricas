Feature: RF-04 Carrito de Compras

  Scenario: Agregar un producto al carrito
    Given el usuario está en la página de productos
    When el usuario selecciona un producto y hace clic en el botón "Agregar al carrito"
    Then el producto debería ser añadido al carrito
    And el usuario debería ver un mensaje de confirmación "Producto agregado al carrito"

  Scenario: Ver el carrito de compras
    Given el usuario tiene productos en el carrito
    When el usuario hace clic en el icono del carrito
    Then el usuario debería ser redirigido a la página del carrito de compras
    And el usuario debería ver una lista de los productos añadidos al carrito

  Scenario: Actualizar cantidad de un producto en el carrito
    Given el usuario está en la página del carrito de compras
    When el usuario cambia la cantidad de un producto en el carrito
    And hace clic en el botón "Actualizar carrito"
    Then la cantidad del producto debería ser actualizada
    And el usuario debería ver un mensaje de confirmación "Cantidad actualizada"

  Scenario: Eliminar un producto del carrito
    Given el usuario está en la página del carrito de compras
    When el usuario hace clic en el botón "Eliminar" junto a un producto
    Then el producto debería ser eliminado del carrito
    And el usuario debería ver un mensaje de confirmación "Producto eliminado del carrito"
