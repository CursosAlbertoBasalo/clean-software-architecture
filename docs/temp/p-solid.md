title: 7 - Objects
class: animation-fade
layout: true

.bottom-bar[

{{title}}

]

---

class: impact

# {{title}}

## Arquitectura limpia

> "La encapsulación es importante.

> Pero la razón por la cual es importante es aún más importante.

> La encapsulación nos ayuda a razonar sobre nuestro código".
>
> -- **Michael C. Feathers**.

---

## Las clases, como las funciones: Pequeñas y Claras

- Los objetos encapsulan la **lógica**.

  - Usan estructuras de datos.

--

- Suelen representar **Actores**.

  - Relacionan unas entidades con otras.

--

# _Interfaces_ mejor que herencia

---


[La biblia de los patrones de diseño](https://refactoring.guru/design-patterns)

![SOLID](./assets/solid.jpg)

---

### S : Single responsibility principle

**Principio de responsabilidad única**
Un objeto solo debería tener una única responsabilidad, o razón para cambiar.

--

### O : Open/closed principle

**Principio de abierto/cerrado**
Las entidades de software deben estar abiertas para su extensión, pero cerradas para su modificación.

--

### L : Liskov substitution principle

**Principio de sustitución de Liskov**
Los objetos deberían ser reemplazables por subtipos sin alterar el funcionamiento del programa.

---

### I : Interface segregation principle

**Principio de segregación de la interfaz**
Muchas interfaces específicas son mejores que una interfaz de propósito general.​

--

### D : Dependency inversion principle

**Principio de inversión de la dependencia**
Depender de abstracciones, no de implementaciones concretas. Resolver en ejecución usando la Inyección de Dependencias.

--

[Principios SOLID en JavaScript](https://medium.com/mindorks/solid-principles-explained-with-examples-79d1ce114ace)

[Código mantenible y el principio Open/Close](https://medium.com/@severinperez/maintainable-code-and-the-open-closed-principle-b088c737262)

---

> "Los objetos protegen sus datos detrás de abstracciones y exponen las funciones que operan con esos datos."
>
> -- **Robert C. Martin**

- [Siguiente ->](./8-systems.html)

- [<- Vuelta al índice ](./)
