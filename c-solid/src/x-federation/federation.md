# Federation

## Inter Communication

En este caso, el sistema _EAI_ actúa como la fachada general de múltiples aplicaciones (`ShoppingCart` y `Warehouse`).

Todas las llamadas de eventos desde el _mundo exterior_ a cualquiera de las aplicaciones tienen un inicio frontal por parte del sistema _EAI_.

El sistema EAI está configurado para exponer solo la información relevante y las interfaces de las aplicaciones subyacentes al _mundo exterior_, y realiza todas las interacciones con las aplicaciones subyacentes en nombre del solicitante.