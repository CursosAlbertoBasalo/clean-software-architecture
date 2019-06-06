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

> "El código huele."
>
> -- **Martin Fowler**.

---

##  Huele a humo

### Método largo.

- Los métodos pequeños siempre son mejores (nombres documentan reglas, comprensión más fácil, menos código duplicado).

### Clase grande.

- Demasiadas variables de instancia o métodos. Viola el principio de "responsabilidad única".

### Lista larga de parámetros.

- Propio del estilo procedimental en lugar de orientado a objetos. Puede ser que el método haga **demasiadas** cosas.

---

### Obsesión por los primitivos.

- Uso excesivo de valores primitivos en lugar de una mejor abstracción en una clase, una interfaz o una estructura separada.

### Grupos de datos no agrupados.

- Un conjunto de datos que siempre aparecen juntos... pero que no se organizan juntos en ninguna clase o estructura.

---

## Uso indebido de objetos

### Switch vs Open/Close.

- Se puede sustituir mediante datos de configuración y polimorfismo.

### Renuncio a la herencia.

- Las subclases acaban teniendo muy poco en común.

### Clases duplicadas.

- Dos clases hacen lo mismo... sin que seamos conscientes.

---

## Estos mandamientos se resumen en dos:

### DRY: Don't repeat yourself.

- Cada regla o atributo debe tener **una representación única e inequívoca** dentro de un sistema.

### KISS: Keep it simple, Stupid!

- La simplicidad es un objetivo para evitar la complejidad **innecesaria**.


> "La simplicidad consiste en quitar lo obvio y agregar lo significativo.".
>
> -- **John Maeda**.

---

# El usuario es lo primero

## Requisitos, casos de uso e historias de usuario.
## Testing para quitarnos el miedo.

---

# Arquitecturas para construir software de tamaño reducido

>Hasta 2 años de tiempo de desarrollo y mantenimiento evolutivo activo con equipos estables de menos de 5 integrantes.

**Ejemplos**: Producto mínimo viable en una start-up que no se sabe si vivirán lo suficiente. Proyectos para campañas o negocios de duración limitada y conocida. Herramientas _adhoc_ para integración temporal entre sistemas. Otros desarrollos técnica y funcionalmente simples.

---

**Situación**: Los tiempos y presupuestos serán muy rigurosos, por tanto debemos abaratar y reducir el desarrollo. Los cambios funcionales serán muy frecuentes, aunque afortunadamente muchos ocurrirán antes de la puesta en producción con cliente y riesgo real. La reducción del coste del cambio está en la reducción del coste de entender y manipular el código.

**Objetivo**: Reutilizar código, principio _DRY_, pero sin complicarlo demasiado para facilitar el cambio constante: principios _YAGNI_ y _KISS_.

---

## Reglas:

**Código**: Evitar los _code smells_ mediante aplicación de reglas que lleven a un código limpio fácil de leer.

**Mantra**: Muchas estructuras y funciones pequeñas y bien nombradas.

**Test**: Garantizar que el software sigue funcionando a pesar de los frecuentes cambios mediante smoke-test o pruebas de integración sencillas.

**Componentes**: Separar el código en capas lógicas (packages, namespaces, modules… según el lenguaje). Ej.: `presentación -> lógica -> persistencia`.

**Despliegue**: Mantener mientras sea posible un despliegue sencillo, tendente al monolito en cada capa física. Ej. : `cliente <—> servidor`

---

### Capas de responsabilidad

    - Presentación (UI)
    - Lógica (BL)
    - Persistencia (DA)


- [<- Vuelta al índice ](./)

- [Repo](https://github.com/AcademiaBinaria/clean-software-architecture)
