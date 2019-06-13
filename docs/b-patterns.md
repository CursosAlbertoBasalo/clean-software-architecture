title: Design Patterns
class: animation-fade
layout: true

.bottom-bar[

{{title}}

]

---

class: impact

# {{title}}

## Hacia el pensamiento orientado a objetos

---

# Arquitecturas para construir software de tamaño medio

> Entre **2 y 4 años** de tiempo de desarrollo y mantenimiento evolutivo activo.
>
> Equipos poco variables de entre **2 - 8 integrantes**.

**Ejemplos**:
- Producto en marcha en una start-up en crecimiento.
- Aplicaciones departamentales o para pequeñas empresas.
- Aplicaciones web sobre plataformas standard.
- Otros desarrollos técnica y funcionalmente poco complejos.

---

## Situación:

- Los tiempos y presupuestos permiten **dedicar recursos al diseño técnico** del desarrollo.

- Los **cambios funcionales serán menos frecuentes pero potencialmente más graves**, pues el software estará en uso.

- La reducción del **coste de explotación** está en la reducción de _bugs_ y mantenimiento.

## Objetivo:

> Facilitar el cambio funcional mediante **Design Patterns**, pero con un código localizable con **3 simple layers**.

---

## Reglas:

**Mantra**: _Reparto de responsabilidades entre clases._

**Código**: Evitar más _code smells_ mediante patrones de diseño que lleven a un código fácil de ampliar.

**Test**: Garantizar que el software admite los cambios mediante pruebas de integración sencillas.

**Componentes**: Separar el código en capas lógicas (packages, namespaces, modules… según el lenguaje). Ej.: `presentación -> lógica -> infraestructura`.

**Despliegue**: Mantener mientras sea posible un despliegue sencillo, tendente al monolito en cada capa física. Ej. : `cliente <—> servidor`


---

## Capas Lógicas

| Capa v         |
| :---           |
| Presentación   |
| Negocio        |
| Infraestructura|


---

> Evoluciona en función del tiempo de mantenimiento esperado.
>
> -- **Alguien con experiencia**

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

> "Solo apreciarás un patrón cuando hayas sentido el dolor de su falta."
>
> -- **Erich Gamma**

---

## Creacionales

> ¿Cómo instanciar un objeto o grupo de objetos relacionados?

Proporcionan mecanismos de creación de objetos que aumentan la **flexibilidad y la reutilización** del código existente.

- **Abstract Factory:** una factoría de factorías sin exponer nada concreto.
- **Builder**: crea subtipos de objetos y facilita la construcción de otros complejos.
- **Factory Method:** delega la lógica de creación de instancias a clases secundarias.
- **Simple Factory:** genera una instancia sin exponer lógica de creación.
- **Singleton:** asegura una instancia única de una clase.

---

## Estructurales

> ¿Cómo montar un componente a partir de objetos?

Explican cómo ensamblar objetos y clases en estructuras más grandes, manteniendo las estructuras **flexibles y eficientes**.

- **Adapter:** envuelve un objeto en un adaptador para que sea compatible con otro.
- **Bridge:** se trata de preferir la composición sobre la herencia.
- **Composite:** permite tratar con objetos individuales de manera uniforme.
- **Decorator:** permite agregar comportamiento envolviendo un objeto en otro.
- **Façade:** proporciona un acceso simple a un sistema de objetos complejo.
- **Flyweight:** reduce el consumo de memoria o CPU compartiendo recursos.
- **Proxy:** una clase actúa como representante de otra.

---


## De comportamiento

> ¿Cómo ejecutar una funcionalidad entre varios objetos?

Cuidan la comunicación efectiva y la asignación de responsabilidades entre objetos.

- **Chain of Responsibility:** encadena llamadas entre objetos o métodos
- **Command:** encapsula acciones en objetos.
- **Iterator** accede a los elementos de un conjunto sin revelar cómo.
- **Mediator:** desacopla dos objetos comunicándose con ambos.
- **Memento:** guarda el estado actual para un uso futuro.
- **Observer:** notifica cambios a suscriptores interesados.
- **Strategy:** cambia el algoritmo según las circunstancias.

---

## Creational

### Builder

```typescript
export class ShoppingCartManager {
  constructor( client: Client ) {
    this.shoppingCartBuilder = new ShoppingCartBuilder( client );
    this.shoppingCart = this.shoppingCartBuilder.build();
  }
  public calculateCheckOut( checkOut: CheckOut ) {
    this.shoppingCartBuilder.setCheckOut( checkOut );
  }
}
```

---

### Factory Method

```typescript
interface ITemplateManager {
  getTemplate( shoppingCart: ShoppingCart ): string;
  getMessage( content: string ): string;
}
class InvoiceTemplateManager implements ITemplateManager{}
class OrderTemplateTemplateManager implements ITemplateManager{}

class DocumentManager {
  protected  templateManager: ITemplateManager;
  constructor() { this.setTemplateManager(); }
  protected setTemplateManager(): ITemplateManager
}
```

---

```typescript
class InvoiceManager extends DocumentManager{
  protected setTemplateManager(): InvoiceTemplateManager {
    this.templateManager = new InvoiceTemplateManager();
  }
}
class OrderManager extends DocumentManager{
  protected setTemplateManager(): OrderTemplateTemplateManager {
    this.templateManager = new OrderTemplateManager();
  }
}

class CheckOutFacade{
 public sendInvoice( shoppingCart: ShoppingCart ) {
    const invoiceManager = new InvoiceManager();
    invoiceManager.send( shoppingCart );
  }
  public sendOrder( shoppingCart: ShoppingCart ) {
    const orderManager = new OrderManager();
    orderManager.send( shoppingCart );
  }
}
```
---

## Structural

### Adapter

```typescript
class TaxBaseInfoAdapter implements TaxBaseInfo {
  public base: number;
  public country: string;
  public isATaxFreeProduct: boolean | undefined;
  constructor( client: Client ) {
    this.base = 0;
    this.country = client.country;
    this.isATaxFreeProduct = false;
  }
  public getFromFromLineItem( line: LineItem ) {
    this.base = line.amount;
    this.isATaxFreeProduct = line.taxFree;
    return this;
  }
  public getFromFromLegalAmount( legalAmounts: LegalAmounts ) {
    this.base = legalAmounts.amount;
    return this;
  }
}
```

---

```typescript
class CheckOutFacade{
   public calculateTotalTax(): number {
    const totalTaxInfo: TaxBaseInfo = new TaxBaseInfoAdapter(
      this.shoppingCart.client
    ).getFromFromLegalAmount( this.shoppingCart.legalAmounts );
    return TaxCalculator.calculateTax( totalTaxInfo );
  }
  public calculateLineTax( line: LineItem ): number {
    const lineTaxInfo: TaxBaseInfo = new TaxBaseInfoAdapter(
      this.shoppingCart.client
    ).getFromFromLineItem( line );
    return TaxCalculator.calculateTax( lineTaxInfo );
  }
}
```

---

### Façade

```typescript
export class ToolsFacade {
  private readonly checker = new Checker();
  private readonly logger = new Logger();
  private readonly fileManager = new FileManager();
  private readonly pathManager = new PathManager();
  public readonly emailFolder = this.pathManager.emailFolder;
  public readonly printFolder = this.pathManager.printFolder;

  public printContentToFile( fileToPrint: FileToPrint ) {
    Printer.printContentToFile( fileToPrint );
  }
  public log( logContent: string ) {
    this.logger.print( logContent );
  }
  public joinPaths( folderPath: string, fileName: string ) {
    return this.pathManager.join( folderPath, fileName );
  }
  public writeFile( fileContent: FileContent ) {
    this.fileManager.writeFile( fileContent );
  }
}
```

---

## Behavioral

### Mediator

``` typescript
import { WarehouseAdministrator } from '../b-warehouse/1-presentation/warehouse-administrator';
import { LineItem } from '../z-common/3-infraestructure/models/line-item';
export class IntegrationMediator {
  private readonly warehouseAdministrator = new WarehouseAdministrator();

  public updatePurchasedProduct( purchasedItem: LineItem ): number {
    return this.warehouseAdministrator.updatePurchasedProduct( purchasedItem );
  }
}
```

> Aplicado en tema c-solid.

---

- [<- Vuelta al índice ](./)

- [Repo](https://github.com/AcademiaBinaria/clean-software-architecture)
