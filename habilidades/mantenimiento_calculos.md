# Habilidades de Desarrollo - JK Conversor

Este documento registra las lógicas personalizadas y habilidades implementadas para el mantenimiento del calculador de divisas.

## 1. Lógica de Cálculo de Márgenes (Envío)
Para que el descuento sea intuitivo (basado en porcentaje directo del monto enviado), se utiliza una fórmula **multiplicativa** en lugar de divisiva.

- **Fórmula:** `Tasa Final = Tasa Proveedor * (1 - Margen % / 100)`
- **Ubicación:** `src/constants.js` -> Función `calcularTasaEnvio`.
- **Especiales:** En cruces de monedas como **ZELLE/USDT**, el margen se aplica directamente sobre el factor de conversión.

## 2. Formato Regional de Montos (Puntos para miles, Comas para decimales)
Se implementó un sistema de "Shadow Input" donde el usuario ve el formato regional mientras escribe, pero el sistema procesa números puros.

### Helpers en `src/constants.js`:
- `parsearMonto(valorString)`: Elimina puntos de miles y cambia la coma decimal por punto para que JS pueda hacer matemáticas.
- `formatearMontoInput(valorNumerico)`: Convierte un número o string numérico al formato visual `1.234.567,89`.

### Implementación en UI (`src/Cotizador.jsx`):
- Los inputs deben ser de tipo `type="text"`.
- En el evento `onChange`, se debe:
  1. Limpiar el valor (solo permitir números y una coma).
  2. Guardar el valor "crudo" en el estado para los cálculos.
  3. Formatear el valor visual utilizando `formatearMontoInput`.

## 3. Despliegue y Git
- **Comando:** `npm run deploy` para actualizar la web en GitHub Pages.
- **Rama principal:** `main`.
- **Visibilidad:** El repositorio es **PÚBLICO** para permitir el alojamiento gratuito en GitHub Pages.

---
*Automatizado por Antigravity - Ref: 7b6b13a1-8e8c-43b1-a05d-b7aaca4a24d3*
