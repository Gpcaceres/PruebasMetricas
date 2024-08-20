Feature: RF-02 Comprar Productos

  Scenario: Realizar un pedido con productos en el carrito
    Given el usuario tiene productos en el carrito
    When el usuario hace clic en el botón "Realizar pedido"
    And ingresa la información de envío requerida
    And hace clic en el botón "Confirmar pedido"
    Then el pedido debería ser creado en el sistema
    And el usuario debería ver un mensaje de confirmación "Pedido realizado exitosamente"
    And el carrito de compras debería estar vacío
