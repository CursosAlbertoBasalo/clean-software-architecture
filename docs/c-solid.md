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

---

# Arquitecturas para construir software de gran tamaño.

> Entre **4 y 8 años** de tiempo de desarrollo y mantenimiento evolutivo activo.
>
> Equipos variables de **8 o más integrantes**.

**Ejemplos**:

- Productos de start-up que ya han funcionado.
- Automatización de procesos de negocio de empresas consolidadas.
- Renovación de sistemas de información en organizaciones con sistemas legacy.

---

## Situación:

- Si algo hay seguro para los próximos años es que **las reglas** del negocio informatizado **van a cambiar**.

- Por si fuera poco, lo harán ya **con el sistema en producción** dando servicio ininterrumpido a un público **crítico para la empresa**.

- Así que **el cambio** ha de integrarse de manera transparente y **sin oposición**. Impactando lo menos posible en el código ya hecho y en los paquetes ya desplegados.

## Objetivo:

> La extensibilidad de un sistema crítico en producción; que se consigue facilitando el desarrollo mediante el uso de los principios **SOLID** y el despliegue en **silos funcionales** conectados pero independientes.

---

## Reglas:

**Mantra**: Encapsular lo que varía y depender de interfaces en lugar de implementaciones concretas.

**Código**: Fomentar el cambio funcional mediante la aplicación de los _principios SOLID_ al diseño de las clases.

**Test**: Garantizar que el software funciona unitariamente mediante pruebas a nivel de paquete desplegable.

**Componentes**: Las tres capas lógicas por niveles son insuficientes. Para permitir un desarrollo paralelo e independiente debemos desacoplaras mediante abstracciones intermedias.

**Despliegue**: Para reducir el impacto de un cambio, este debe afectar a partes y nunca a todo del sistema. Los componentes, agrupados en silos, se ejecutan en **servicios funcionales** verticales que no exijan el compilado y despliegue completo.

---

### Silos funcionales

    - Utilidades comunes
    - Aspectos e instrumentación
    - Funciones específicas: departamentos, historias, requisitos...


| Capa v Silo >     | a-ShoppingCart |  b-Warehouse  |  c-Common   |
| :---              |      :----:    |     :----:    |   :----:    |
| 1-Presentación    |       a-1      |      b-1      |     z-1     |
| 2-Negocio         |       a-2      |      b-2      |     z-2     |
| 3-Infraestructura |       a-3      |      b-3      |     z-3     |

---


# EAI: Enterprise Application Integration

> "Orienta tu código para un uso futuro,

> no solo para las necesidades inmediatas."
>
> -- **Eric Freeman**

---

## Mediation

### Intra Communication

Aquí, el sistema _EAI_ actúa como intermediario entre varias aplicaciones.

Cada vez que ocurre un evento interesante en una aplicación (por ejemplo, se crea realiza un _checkout_ desde `ShoppingCart`) se notifica a un módulo de integración (`IntegrationMediator`) en el sistema _EAI_.

El módulo luego propaga los cambios a otras aplicaciones relevantes (por ejemplo la de `Warehouse`).

La comunicación puede y suele ser bidireccional.

---

## Federation

### Inter Communication

En este caso, el sistema _EAI_ actúa como la fachada general de múltiples aplicaciones (`ShoppingCart` y `Warehouse`).

Todas las llamadas de eventos desde el _mundo exterior_ a cualquiera de las aplicaciones tienen un inicio frontal (`IntegrationFederator`) por parte del sistema _EAI_.

El sistema EAI está configurado para exponer solo la información relevante y las interfaces de las aplicaciones subyacentes al _mundo exterior_, y realiza todas las interacciones con las aplicaciones subyacentes en nombre del solicitante.

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

```typescript
export class WarehouseAdministrator {
  public static productCatalog: Product[] = PRODUCT_CATALOG;
  protected readonly ordersProcessor = new OrdersProcessor();

  private static findProductByName( productName: string ) {
    return WarehouseAdministrator.productCatalog.find( product => product.name === productName );
  }

  public processOrders() {
    this.ordersProcessor.processOrders();
  }
}
```

---

### O : Open/closed principle

**Principio de abierto/cerrado.**
Las entidades de software deben estar abiertas para su extensión, pero cerradas para su modificación.

```typescript
// public sendInvoice( shoppingCart: ShoppingCart ) {
//   const invoiceManager = new InvoiceManager();
//   invoiceManager.send( shoppingCart );
// }
// public sendOrder( shoppingCart: ShoppingCart ) {
//   const orderManager = new OrderManager();
//   orderManager.send( shoppingCart );
// }
public sendDocument( shoppingCart: ShoppingCart, documentTypeName: string ) {
  const documentType: DocumentType = this.checker.findSafe(
    this.documentTypes,
    ( documentType: DocumentType ) => documentType.typeName === documentTypeName
  );
  documentType.sender.send( shoppingCart );
}
```

---

### L : Liskov substitution principle

**Principio de sustitución de Liskov.**
Los objetos deberían ser reemplazables por subtipos sin alterar el funcionamiento del programa.

```typescript
export abstract class DocumentManager implements ISendDocuments {}
export class InvoiceManager extends DocumentManager {
  constructor() {
    super();
  }
}
export class OrderManager extends DocumentManager {
  constructor() {
    super();
  }
}
```

---

### I : Interface segregation principle

**Principio de segregación de la interfaz.**
Muchas interfaces específicas son mejores que una interfaz de propósito general.​

```typescript
export class ToolsFacade implements ICheck, ILogger, IManageFiles, IManagePaths {
  private readonly checker = new Checker();
  private readonly logger = new Logger();
  private readonly fileManager = new FileManager();
  private readonly pathManager = new PathManager();
  public readonly emailFolder = this.pathManager.emailFolder;
  public readonly printFolder = this.pathManager.printFolder;

  public printLog( logContent: string ) {
    this.logger.printLog( logContent );
  }
}
```

---

### D : Dependency inversion principle

**Principio de inversión de la dependencia.**
Depender de abstracciones, no de implementaciones concretas. Resolver en ejecución usando la Inyección de Dependencias.

```typescript
import { FileManager } from '../../../z-common/3-infraestructure/helper/import/file-manager';
import { IManageFiles } from '../../../z-common/3-infraestructure/models/i-manage-files';
export class ManageFilesFactory {
  public createInstance(): IManageFiles {
    if ( true ) {
      return new FileManager();
    }
  }
}
```

--

[Principios SOLID en JavaScript](https://medium.com/mindorks/solid-principles-explained-with-examples-79d1ce114ace)


---


- [<- Vuelta al índice ](./)

- [Repo](https://github.com/AcademiaBinaria/clean-software-architecture)
