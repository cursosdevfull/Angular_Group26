# Lib

Librería Angular que proporciona un conjunto de componentes UI reutilizables basados en [Angular Material](https://material.angular.io/), diseñados para estandarizar y acelerar el desarrollo de interfaces en aplicaciones del ecosistema **cdev**.

## Versión

Angular CLI 21.2.0

## Requisitos previos

- **Angular** `^21.2.0`
- **Angular Material** `^21.2.14`

## Instalación y construcción

La librería se construye con Angular CLI utilizando `ng-packagr`. Para compilarla, ejecuta:

```bash
ng build lib
```

Los artefactos de compilación se generan en el directorio `dist/lib/`.

### Publicación

Para publicar la librería en npm:

1. Navega al directorio de distribución:

   ```bash
   cd dist/lib
   ```

2. Ejecuta el comando de publicación:

   ```bash
   npm publish
   ```

## Componentes

La librería exporta los siguientes componentes, todos con el prefijo `cdev-lib`:

### Container

**Selector:** `cdev-lib-container`

Contenedor envolvente basado en `MatCard`, útil para agrupar visualmente secciones de contenido.

Uso:

```html
<cdev-lib-container>
  <p>Contenido del contenedor</p>
</cdev-lib-container>
```

---

### ErrorMessage

**Selector:** `cdev-lib-error-message`

Muestra mensajes de error de validación para formularios reactivos. Recibe un `FieldState` de Angular Forms Signals y renderiza los errores cuando el control ha sido tocado (`touched`).

**Input:**

- `control` — `FieldState<any, string | number>` (requerido)

Uso:

```html
<cdev-lib-error-message [control]="nombreControl()" />
```

---

### Title

**Selector:** `cdev-lib-title`

Componente simple para renderizar títulos estilizados.

**Input:**

- `title` — `string` (opcional, valor por defecto: `''`)

Uso:

```html
<cdev-lib-title title="Mi página" />
```

---

### Table

**Selector:** `cdev-lib-table`

Tabla de datos basada en `MatTable` con soporte para metadatos de columnas, columnas proyectadas mediante `MatColumnDef` y selección de filas.

**Inputs:**

- `dataSource` — `any[]` (requerido) — Datos a mostrar en la tabla.
- `metadata` — `any[]` (requerido) — Definición de columnas; cada elemento debe tener una propiedad `field`.

**Outputs:**

- `onRowSelected` — `EventEmitter<any>` — Emite la fila seleccionada.

**Proyección de contenido:** Soporta `MatColumnDef` para columnas personalizadas (por ejemplo, columnas de acciones con botones).

Uso:

```html
<cdev-lib-table
  [dataSource]="dataSource()"
  [metadata]="metadata()"
  (onRowSelected)="onRowSelected($event)"
>
  <mat-column-def name="acciones">
    <ng-template matColumnDef let-element>
      <button (click)="editar(element)">Editar</button>
    </ng-template>
  </mat-column-def>
</cdev-lib-table>
```

---

### Scrollbars

**Selector:** `cdev-lib-scrollbars`

Contenedor con estilos de scrollbar personalizables a través de un input de estilo en línea.

**Input:**

- `customStyle` — `string` (opcional, valor por defecto: `''`)

Uso:

```html
<cdev-lib-scrollbars customStyle="height: 400px; overflow-y: auto;">
  <!-- Contenido con scroll -->
</cdev-lib-scrollbars>
```

---

### Paginator

**Selector:** `cdev-lib-paginator`

Paginador basado en `MatPaginator` con internacionalización personalizada para español (etiquetas provistas por `PaginatorDefinition`).

**Inputs:**

- `pageSize` — `number` (requerido) — Cantidad de elementos por página.
- `length` — `number` (requerido) — Total de elementos.

**Outputs:**

- `onChangePage` — `EventEmitter<number>` — Emite el índice de la página seleccionada (basado en cero).

Uso:

```html
<cdev-lib-paginator
  [pageSize]="pageSize()"
  [length]="total()"
  (onChangePage)="onChangePage($event)"
/>
```

## Pruebas unitarias

Para ejecutar las pruebas unitarias con [Karma](https://karma-runner.github.io):

```bash
ng test lib
```

## Pruebas end-to-end

La librería no incluye un framework de pruebas end-to-end por defecto. Se puede integrar el que mejor se adapte a las necesidades del proyecto.

## Recursos adicionales

- [Documentación de Angular CLI](https://angular.dev/tools/cli)
- [Angular Material](https://material.angular.io/)
- [ng-packagr](https://github.com/ng-packagr/ng-packagr)
