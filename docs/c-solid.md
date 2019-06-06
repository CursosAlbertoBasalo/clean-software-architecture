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

[Arquitectura de software] (https://medium.com/@albertobasalo71/la-arquitectura-del-software-y-el-tiempo-dc7f55c23bce)

Evoluciona en función del tiempo de mantenimiento esperado.

---

## Obstáculos para el cambio

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

- [Repo](https://github.com/AcademiaBinaria/CleanCode)
