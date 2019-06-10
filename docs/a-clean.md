title: Clean and tested
class: animation-fade
layout: true

.bottom-bar[

{{title}}

]

---

class: impact

# {{title}}

## Código que funciona sin miedo

---


# El usuario es lo primero

> "El código huele."
>
> -- **Martin Fowler**.

---

##  Huele a humo

### Método largo.

- Los métodos pequeños siempre son mejores (nombres que documentan reglas, una comprensión más fácil, menos código duplicado).

### Clase grande.

- Si tiene demasiadas variables, propiedades o métodos seguro que viola el principio de "responsabilidad única".

### Lista larga de parámetros.

- Propio del estilo procedimental en lugar de orientado a objetos. También puede indicar que el método haga **demasiadas** cosas.

---

### Obsesión por los primitivos.

- Uso excesivo de valores primitivos en lugar de una mejor abstracción en una clase, una interfaz o una estructura separada.

### Grupos de datos no agrupados.

- Un conjunto de datos que siempre aparecen juntos... pero que no se organizan juntos en ninguna clase o estructura.

---

## Uso indebido de objetos

### Switch vs Open/Close.

- Se pueden sustituir muchas condiciones mediante estructuras de datos de configuración y polimorfismo de clases.

### Renuncio a la herencia.

- Las subclases acaban teniendo muy poco en común, o negando a sus ancestros. Mejor composición e interfaces.

### Clases duplicadas.

- Dos clases (o dos métodos, o dos bloques) hacen lo mismo... sin que seamos conscientes.

---

## Estos mandamientos se resumen en dos:

### DRY: Don't repeat yourself.

- Cada regla o atributo debe tener **una representación única e inequívoca** dentro de un sistema.

### KISS: Keep it simple, Stupid!

- La simplicidad es un objetivo para evitar la **complejidad innecesaria**.


> "La simplicidad consiste en quitar lo obvio y agregar lo significativo."
>
> -- **John Maeda**.

---

# El usuario es lo primero

> "Asegúrate de que el software hace lo que yo quiero que haga."
>
> -- **El que paga**.

---

## Requisitos: casos de uso e historias de usuario.

### Use Cases:

Detalle del proceso que resuelve el sistema

> Describen el proceso paso a paso hasta alcanzar el objetivo de un usuario mediante un sistema. Capta con detalle el punto de vista del usuario al describir los requisitos funcionales del sistema.
>
>
>  -- **Ivar Jacobson**

### User Stories

Genéricas, ágiles y que permiten definir pruebas de aceptación básicas.

> Es una pequeña nota (**Card**) en la que se captura de manera general algo que un usuario hace o necesita hacer.
> Requiere **Conversaciones** permanentes para refinarla y **Confirmación** pasa su aceptación.
>
>  -- **Ron Jeffries**

---

## Testing para comprobar.

### Value Statement:

> As a __(user role)__, I want to __(activity)__, so that __(business value)__

### Acceptance Criteria:

> Given __(context__), when __(action performed)__, then should __(observable consequences)__

### Testing

```javascript
describe(
  `As a customer I want to check out so I can pay and get the products`)
assert = {
    given: 'a shopping cart',
    should: 'calculate check out',
    actual: shoppingCart.legalAmounts.total,
    expected: 6615,
  };
```

---


- [<- Vuelta al índice ](./)

- [Repo](https://github.com/AcademiaBinaria/clean-software-architecture)
