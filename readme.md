# Warlock

## Установка

### Подготовка
Перед устновкой необходимо иметь уставонленные локально [Node js](https://nodejs.org/en/) и [NPM](https://www.npmjs.com/)

Выкачать проект

    git clone https://github.com/vasilisq/warlock-server.git
Перейти в папку с проектом

    cd warlock-server
### Запуск в PRODACTION

    npm install
    npm run build
    npm start
    
### Запуск в DEVELOPMENT
 Подтянуть зависимости
     
     npm install
Запустить в одном терминале сборку фронта в watch режиме:
    
    npm run build:dev
или

    npm run webpack-dev-server
    
Запустить в другом терминале сервер в watch режиме

    npm run start:dev
### Запуск тестов
to be continued

    npm run test
### Linter
to be continued
Линтер на клиентский js:

    npm run lint:front


## Общая информация
- [Сообщения](./docs/messages.md)

## API
- [Player](./docs/api/player.md)
- [Effect](./docs/api/effect.md)
- [Missile](./docs/api/missile.md)
