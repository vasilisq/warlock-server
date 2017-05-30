# Сообщения Player'a

## Connected
**Имя события**: `connected`

**Broadcast**: `+`

**Структура**:
```
{ 
    Player: { 
      id: 1,
      maxHP: 30,
      nickname: 'unnamed'
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
            dimensions: 30,
            nickname: 'unnamed'
        },
        // ...
    ] 
}
```

## PlayerDamaged
**Имя события**: `playerDamaged`

**Broadcast**: `+`

**Структура**:
```
{ 
  Player: { 
    id: 1,
    health: 10
  },
  Damage: 10,
  Damager: {
    id: 1,
    entityClass: entity
  }
}
```

## PlayerDied
**Имя события**: `playerDied`

**Broadcast**: `+`

**Структура**:
```
{ 
  Player: { 
    id: 1 
  },
  Damage: 10,
  Damager: {
    id: 1,
    entityClass: entity
  }
}
```

## PlayerRespawn
**Имя события**: `playerRespawn`

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
