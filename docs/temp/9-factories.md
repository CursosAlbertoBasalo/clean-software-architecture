title: 9 - Factories
class: animation-fade
layout: true

.bottom-bar[

{{title}}

]

---

class: impact

# {{title}}

## Construcción de sistemas


> "Dentro de cada gran programa hay un pequeño programa tratando de salir.".
>
> -- **Tony Hoare**.

---

### Fabricamos sistemas usando objetos y estructuras de datos

- Pensando en el **Mantenimiento**
- Pensando en la **EVOLUCIÓN**
- ...sin caer en el _por si acaso_.

---



# Arquitecturas para construir software de tamaño medio.

> Entre 2 y 5 años de tiempo de desarrollo y mantenimiento evolutivo activo con equipos de 5 o más integrantes.

**Ejemplos**: Productos de start-up que ya han funcionado. Automatización de procesos de negocio de empresas consolidadas. Renovación de sistemas de información en organizaciones con sistemas legacy.

---

**Situación**: Si algo hay seguro para los próximos años es que las reglas del negocio informatizado van a cambiar. Por si fuera poco, lo harán ya con el sistema en producción dando servicio ininterrumpido a clientes o sistemas críticos para la empresa. Así que el cambio ha de integrarse de manera transparente y sin oposición. Impactando lo menos posible en el código ya hecho y en los paquetes ya desplegados.

**Objetivo**: La extensibilidad de un sistema en producción, que se consigue facilitando el desarrollo y despliegue por partes conectadas pero independientes.

---

## Reglas:

**Código**: Fomentar el cambio funcional mediante la aplicación de los principios SOLID al diseño de las clases.
**Mantra**: Encapsular lo que varía y depender de interfaces en lugar de implementaciones concretas.
**Test**: Garantizar que el software funciona unitariamente mediante pruebas a nivel de paquete desplegable.
**Componentes**: Las tres capas lógicas por niveles son insuficientes. Para permitir un desarrollo paralelo e independiente debemos desacoplaras mediante abstracciones intermedias.
**Despliegue**: Para reducir el impacto de un cambio, este debe afectar a partes y nunca a todo del sistema. Los componentes deben agruparse en silos funcionales verticales que no exijan el compilado y despliegue completo.

---

### Silos funcionales

    - Utilidades comunes
    - Aspectos e instrumentación
    - Funciones específicas: departamentos, historias, requisitos...


| Capa        | Tools       | Security   | Logistics  | Operations |
| :---        |    :----:   |   :----:   |   :----:   |  :----:    |
| Presentación|             |            |            |            |
| Lógica      |             |            |            |            |
| Persistencia|             |            |            |            |

---

![A veces veo patrones de diseño](./assets/isee.jpg)

[Construcción de objetos usando funciones](https://medium.freecodecamp.org/how-to-build-reliable-objects-with-factory-functions-in-javascript-9ec1c089ea6f)

---

> "No es el lenguaje lo que hace que los programas parezcan simples.

> Es el programador el que hace que el lenguaje parezca simple!"
>
> -- **Robert C. Martin**

- [Siguiente ->](./a-extra.html)

- [<- Vuelta al índice ](./)
