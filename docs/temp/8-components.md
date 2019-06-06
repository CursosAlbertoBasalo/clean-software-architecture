title: 8 - Systems
class: animation-fade
layout: true

.bottom-bar[

{{title}}

]

---

class: impact

# {{title}}

## Responsabilidad repartida

> "La simplicidad consiste en quitar lo obvio y agregar lo significativo.".
>
> -- **John Maeda**.

---

#### Las instrucciones se agrupan en bloques...

--

### Los bloques construyen funciones...

--

## Las funciones se abstraen en objetos...

--

# Los objetos se organizan en sistemas.

---


##1

#### Los sistemas de clases bien diseñados se componen de

### Piezas reemplazables

--

##2

#### Los sistemas de clases bien diseñados se organizan en

### Capas y niveles de abstracción

--

##3

#### Los sistemas de clases bien diseñados mantienen

### Sus Dependencias Controladas en todo momento.


---

# Arquitecturas para construir software de tamaño reducido

>Hasta 2 años de tiempo de desarrollo y mantenimiento evolutivo activo con equipos estables de menos de 5 integrantes.

**Ejemplos**: Producto mínimo viable en una start-up que no se sabe si vivirán lo suficiente. Proyectos para campañas o negocios de duración limitada y conocida. Herramientas _adhoc_ para integración temporal entre sistemas. Otros desarrollos técnica y funcionalmente simples.

---

**Situación**: Los tiempos y presupuestos serán muy rigurosos, por tanto debemos abaratar y reducir el desarrollo. Los cambios funcionales serán muy frecuentes, aunque afortunadamente muchos ocurrirán antes de la puesta en producción con cliente y riesgo real. La reducción del coste del cambio está en la reducción del coste de entender y manipular el código.

**Objetivo**: Reutilizar código, principio DRY, pero sin complicarlo demasiado para facilitar el cambio constante: principios YAGNI y KISS.

---

## Reglas:

**Código**: Evitar los _code smells_ mediante aplicación de reglas que lleven a un código limpio fácil de leer.
**Mantra**: Muchas estructuras y funciones pequeñas y bien nombradas.
**Test**: Garantizar que el software sigue funcionando a pesar de los frecuentes cambios mediante smoke-test o pruebas de integración sencillas.
**Componentes**: Separar el código en capas lógicas (packages, namespaces, modules… según el lenguaje). Ej.: `presentación -> lógica -> persistencia`.
**Despliegue**: Mantener mientras sea posible un despliegue sencillo, tendente al monolito en cada capa física. Ej. : `cliente — servidor`

---

### Capas de responsabilidad

    - Presentación
    - Lógica
    - Persistencia



---

![Pasta Code](./assets/pasta_code.jpg)

---

> "La duplicidad es el principal enemigo de un sistema bien diseñado".

> ;-)
>
> -- **Robert C. Martin**

- [Siguiente ->](./9-factories.html)

- [<- Vuelta al índice ](./)

