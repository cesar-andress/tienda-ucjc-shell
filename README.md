# Tienda UCJC — shell de integración

**Asignatura:** Desarrollo de Front-End (76042) · UCJC · curso 2026/2027  
**Repositorio:** https://github.com/cesar-andress/tienda-ucjc-shell  
**Tienda en vivo:** https://cesar-andress.github.io/tienda-ucjc-shell/

Los equipos de alumnos **no** tienen escritura aquí.

## Situación actual · tag `v0.3.0`

| Hecho | Estado |
| --- | --- |
| Tag | **`v0.3.0`** — A/B en **varias piezas a la vez** |
| Rama | **`main`** |
| Identidad | `0.2.3` |
| Descubrimiento | `0.2.3` |
| Compra | A/B: A `0.2.0` (oficial) · B `0.2.0` (`tienda-ucjc-compra-b`, equipo Identidad) |
| Datos | A/B: A `0.2.4` (Hans) · B `0.2.1` (Juampee), defecto **B** |
| Contratos `@1` | Firmados; `pedido-confirmado@2` sigue **propuesto** |

### Aviso Datos A `v0.2.4`

Hans publica `https://hansjeffas.github.io/tienda-ucjc-datos/v0.2.4/remote.js`.  
Esa release escucha solo `ucjc:compra:pedido-confirmado@2`. Compra en la tienda sigue emitiendo `@1`.  
Con `?datos=a` el flujo de «Mis pedidos» **no** recibe pedidos nuevos hasta que exista `@2` firmado y Compra lo emita (o Datos A vuelva a escuchar también `@1`).

### Query A/B multi

```text
?datos=a&compra=b
?datos=b&compra=a
```

Cada pieza con entrada en `ab` tiene su propio conmutador arriba.

### Formato `ab` en el manifest

```json
"ab": {
  "datos": {
    "defecto": "b",
    "variantes": { "a": { "version": "…", "url": "…" }, "b": { "…": "…" } }
  },
  "compra": {
    "defecto": "a",
    "variantes": { "a": { "…": "…" }, "b": { "…": "…" } }
  }
}
```

El formato antiguo (`ab.pieza` + `ab.variantes`) sigue leyéndose como un solo slot.

## Contrato de carga

→ [`docs/CONTRATO-CARGA.md`](docs/CONTRATO-CARGA.md)

## Autoría

Solo `cesar.andress@ucjc.edu`. Hooks en `.githooks`.
