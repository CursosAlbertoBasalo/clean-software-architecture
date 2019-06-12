# Mediation

## Intra Communication

Aquí, el sistema _EAI_ actúa como intermediario entre varias aplicaciones. Cada vez que ocurre un evento interesante en una aplicación (por ejemplo, se crea realiza un checkout desde `ShoppingCart`) se notifica a un módulo de integración en el sistema _EAI_. El módulo luego propaga los cambios a otras aplicaciones relevantes (por ejemplo la de `Warehouse`).