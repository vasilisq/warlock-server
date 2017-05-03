# Сообщения Missile

## StartMove
**Имя события**: `startMove`

**Broadcast**: `+`

**Структура**:
```
{
    With: {
        id: 1,
        entityClass: 'entity',
        dimensions: 10
    },

    Vector: {
        x: 0,
        y: 0
    },

    Direction: {
        x: 1,
        y: 1
    },

    Speed: 10
}
```

## EndMove
**Имя события**: `endMove`

**Broadcast**: `+`

**Структура**:
```
{
    With: {
        id: 1,
        entityClass: 'entity',
        dimensions: 10
    },

    Vector: {
        x: 0,
        y: 0
    }
}
```

