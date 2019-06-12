title: SOLID
class: animation-fade
layout: true

.bottom-bar[

{{title}}

]

---

class: impact

# {{title}}

## Principios sólidos para finales flexibles

> "Orienta tu código para un uso futuro,

> no solo para las necesidades inmediatas."
>
> -- **Eric Freeman**

---

# Arquitecturas para construir software de gran tamaño.

> Entre **4 y 8 años** de tiempo de desarrollo y mantenimiento evolutivo activo con equipos variables de **8 o más integrantes**.

**Ejemplos**:

- Productos de start-up que ya han funcionado.
- Automatización de procesos de negocio de empresas consolidadas.
- Renovación de sistemas de información en organizaciones con sistemas legacy.

---

**Situación**:
- Si algo hay seguro para los próximos años es que **las reglas** del negocio informatizado **van a cambiar**.

- Por si fuera poco, lo harán ya **con el sistema en producción** dando servicio ininterrumpido a un público **crítico para la empresa**.

- Así que **el cambio** ha de integrarse de manera transparente y **sin oposición**. Impactando lo menos posible en el código ya hecho y en los paquetes ya desplegados.

**Objetivo**:

> La extensibilidad de un sistema en producción; que se consigue facilitando el desarrollo y el despliegue en _silos funcionales_ conectados pero independientes.

---

## Reglas:

**Código**: Fomentar el cambio funcional mediante la aplicación de los _principios SOLID_ al diseño de las clases.

**Mantra**: Encapsular lo que varía y depender de interfaces en lugar de implementaciones concretas.

**Test**: Garantizar que el software funciona unitariamente mediante pruebas a nivel de paquete desplegable.

**Componentes**: Las tres capas lógicas por niveles son insuficientes. Para permitir un desarrollo paralelo e independiente debemos desacoplaras mediante abstracciones intermedias.

**Despliegue**: Para reducir el impacto de un cambio, este debe afectar a partes y nunca a todo del sistema. Los componentes deben agruparse en _silos funcionales_ verticales que no exijan el compilado y despliegue completo.

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

# Obstáculos del cambio

## Cambio divergente.

- Una clase que se cambia de diferentes maneras o por diferentes razones.

## Cirugía con escopeta

- Un cambio que requiere cambios en muchas clases. Difícil encontrarlos, fácil olvidarse.

## Complejidad ciclomática.

- Número de rutas únicas que aumenta con el anidamiento, los _switches_ y las condiciones complejas.

---

## Acoplamiento indecente

### Envidia de funcionalidades.

- Método que parece más interesado en una clase distinta de la suya.

### Intimidad inapropiada

- Clases que se conocen demasiado.

### Mensajes encadenados

- Something.Another().SomeOther().Other.YetAnother();

### Intermediario

- Si una clase delega todo su trabajo a otra clase, ¿por qué existe?.


---


## Consecuencias que dificultan el cambio

### Rigidez

**Un cambio afecta a muchas partes.**
Al cambiar un objeto hay que cambiar otros muchos.

### Fragilidad

**Las errores saltan en lugares inesperados.**
Los cambios en un objeto tienen efectos en otros muchos.

### Inmovilidad

**No se puede reutilizar el código fuera de su entorno.**
Los cambios en un objeto dependen de otros muchos.

---

![SOLID](./assets/solid.jpg)

---

### S : Single responsibility principle

**Principio de responsabilidad única.**
Un objeto solo debería tener una única responsabilidad, o razón para cambiar.

--

### O : Open/closed principle

**Principio de abierto/cerrado.**
Las entidades de software deben estar abiertas para su extensión, pero cerradas para su modificación.

--

### L : Liskov substitution principle

**Principio de sustitución de Liskov.**
Los objetos deberían ser reemplazables por subtipos sin alterar el funcionamiento del programa.

---

### I : Interface segregation principle

**Principio de segregación de la interfaz.**
Muchas interfaces específicas son mejores que una interfaz de propósito general.​

--

### D : Dependency inversion principle

**Principio de inversión de la dependencia.**
Depender de abstracciones, no de implementaciones concretas. Resolver en ejecución usando la Inyección de Dependencias.

--

[Principios SOLID en JavaScript](https://medium.com/mindorks/solid-principles-explained-with-examples-79d1ce114ace)


---


- [<- Vuelta al índice ](./)

- [Repo](https://github.com/AcademiaBinaria/clean-software-architecture)
