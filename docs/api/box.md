# Сообщения Box'a

## BoxPickUp
**Имя сообщения**: `boxPickUp`

**Broadcast**: `+`

**Структура**:
```
{
  With: {
    id: 1,
    entityClass: 'box',
    dimensions: 30
  }
}
```

## BoxRespawn
**Имя сообщения**: `boxRespawn`

**Broadcast**: `+`

**Структура**:
```
{
  With: {
    id: 1,
    entityClass: 'box',
    dimensions: 30
  },

  // Position
  Vector: {
    x: 0,
    y: 0
  }
}
```
