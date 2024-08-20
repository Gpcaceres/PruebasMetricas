Feature: RF-05 Calificación y Reseñas de Productos

  Scenario: Escribir una reseña para un producto
    Given el usuario ha comprado un producto
    And el usuario está en la página del producto
    When el usuario escribe una reseña en el campo de texto
    And hace clic en el botón "Enviar reseña"
    Then la reseña debería ser guardada en el sistema
    And el usuario debería ver un mensaje de confirmación "Reseña enviada exitosamente"

  Scenario: Ver reseñas de un producto
    Given el usuario está en la página del producto
    When el usuario desplaza hacia la sección de reseñas
    Then el usuario debería ver una lista de reseñas existentes para el producto

  Scenario: Editar una reseña existente
    Given el usuario ha escrito una reseña para un producto
    And el usuario está en la página del producto
    When el usuario hace clic en el botón "Editar reseña"
    And modifica el contenido de la reseña
    And hace clic en el botón "Guardar cambios"
    Then los cambios en la reseña deberían ser guardados en el sistema
    And el usuario debería ver un mensaje de confirmación "Reseña actualizada exitosamente"

  Scenario: Eliminar una reseña existente
    Given el usuario ha escrito una reseña para un producto
    And el usuario está en la página del producto
    When el usuario hace clic en el botón "Eliminar reseña"
    And confirma la eliminación
    Then la reseña debería ser eliminada del sistema
    And el usuario debería ver un mensaje de confirmación "Reseña eliminada exitosamente"
