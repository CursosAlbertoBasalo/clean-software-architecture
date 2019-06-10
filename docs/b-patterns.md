title: Design Patterns
class: animation-fade
layout: true

.bottom-bar[

{{title}}

]

---

class: impact

# {{title}}

## Un catálogo nada exhaustivo

> "Orienta tu código para un uso futuro,

> no solo para las necesidades inmediatas."
>
> -- **Eric Freeman**

---

## Principios para un final feliz

###  POLA: Principle Of Least Astonishment.

- No me sorprendas, no me hagas pensar.

###  YAGNI: You aren't gonna need it.

- Implementa cosas cuando las necesites, no cuando preveas que las necesitas.

### HP: Hollywood principle.

- No nos llames, ya te llamaremos. Inversión del control.

### TDA: Tell don’t ask.

- Decirle a los objetos lo que quieres que hagan (método con datos propios), no consultarles para actuar con sus datos después.

---

### CQS: Command–query separation.

- Cada método debe ser o un comando que realice una acción o una consulta que devuelva datos; **pero no ambos**.

### CoC: Convention over configuration.

- Establecer y cumplir convenios que minimicen la cantidad de decisiones necesarias.

### La Ley de Demeter (LoD)

- Un objeto debe asumir lo menos posible acerca de cualquier otro. _Antiglobalización!_.

### Composite reuse principle

- Mejor componer que heredar.

---

![A veces veo patrones de diseño](./assets/isee.jpg)

> Evoluciona en función del tiempo de mantenimiento esperado.
>
> -- **Alguien con experiencia**
---

# Un catálogo nada exhaustivo

- Tipos: creacionales, estructurales y de comportamiento
- Revisión de los más utilizados

---

# Arquitecturas para construir software de tamaño reducido

>Hasta 2 años de tiempo de desarrollo y mantenimiento evolutivo activo con equipos estables de menos de 5 integrantes.

**Ejemplos**:
- Producto mínimo viable en una start-up que no se sabe si vivirán lo suficiente.
- Proyectos para campañas o negocios de duración limitada y conocida.
- Herramientas _adhoc_ para integración temporal entre sistemas.
- Otros desarrollos técnica y funcionalmente simples.

---

**Situación**:

- Los tiempos y presupuestos serán muy rigurosos, por tanto debemos **abaratar y reducir** el desarrollo.

- Los **cambios funcionales serán muy frecuentes**, aunque afortunadamente muchos ocurrirán antes de la puesta en producción con cliente y riesgo real.

- La reducción del **coste del cambio** está en la reducción del coste de entender y manipular el código.

**Objetivo**:

>Reutilizar código, principio _DRY_, pero sin complicarlo demasiado para facilitar el cambio constante: principios _YAGNI_ y _KISS_.

---

## Reglas:

**Código**: Evitar los _code smells_ mediante aplicación de reglas que lleven a un código limpio fácil de leer.

**Mantra**: Muchas estructuras y funciones pequeñas y bien nombradas.

**Test**: Garantizar que el software sigue funcionando a pesar de los frecuentes cambios mediante smoke-test o pruebas de integración sencillas.

**Componentes**: Separar el código en capas lógicas (packages, namespaces, modules… según el lenguaje). Ej.: `presentación -> lógica -> persistencia`.

**Despliegue**: Mantener mientras sea posible un despliegue sencillo, tendente al monolito en cada capa física. Ej. : `cliente <—> servidor`

---

- [<- Vuelta al índice ](./)

- [Repo](https://github.com/AcademiaBinaria/clean-software-architecture)
