## Установка

```bash
$ cd client
$ npm install
$ cd ..
$ cd server
$ npm install
```

При использовании yarn: 

```bash
$ cd client
$ yarn
$ cd ..
$ cd server
$ yarn
```

После чего необходимо в папке server создать файл переменных окружения с именем .env и заполнить следующими данными:

APP_HOST=имя_хоста

APP_PORT=порт

DB_USERNAME=имя_пользователя_БД

DB_PASSWORD=пароль_пользователя_БД

DB_DATABASE=имя_БД

DB_HOST=имя_хоста_БД

DB_PORT=порт_БД

ACCESS_TOKEN_EXPIRATION_TIME=время_действия_токена_доступа

ACCESS_TOKEN_SECRET=секрет_токена_доступа

REFRESH_TOKEN_EXPIRATION_TIME=время_действия_токена_обновления

REFRESH_TOKEN_SECRET=секрет_токена_обновления

Пример заполнения .env файла содержится в .env.example
После чего в папке server необходимо запустить миграции и добавить начальные данные:
```bash
$ npx sequelize-cli db:migrate
$ npx sequelize-cli db:seed:all
```

Если файл переменных окружения был заполнен верно, то все операции должны пройти успешно, после чего приложение готово к запуску.

## Запуск

В папке server:
```bash
$ npm run start:dev
```

В папке client:
```bash
$ npm run start
```

При использовании yarn: 

В папке server:
```bash
$ yarn start:dev
```

В папке client:
```bash
$ yarn start
```

## Данные администратора

Логин: admin

Пароль: root