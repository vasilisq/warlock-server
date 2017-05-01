# Сообщения Player'a

## Connected
**Имя события**: `connected`

**Broadcast**: `+`

**Структура**:
```
{ 
    Player: { 
      id: 1 
    }, 
    // Позиция игрока
    Vector: { 
      x: 0, 
      y: 0 
    } 
}
```

## Moved
**Имя события**: `moved`

**Broadcast**: `+`

**Структура**:
```
{ 
    Player: { 
      id: 1 
    }, 
    // Новая позиция игрока
    Vector: { 
      x: 0, 
      y: 0 
    } 
}
```

## Players
Выдает список игркоов.

**Имя события**: `players`

**Broadcast**: `-`

**Структура**:
```
{ 
    Players: [ 
        { 
            id: 1, 
            position: {
              x: 0,
              y: 0
            }, 
            dimensions: 30 
        },
        // ...
    ] 
}
```

