# Проект Чат (Slack)

### Hexlet tests and linter status:
[![Actions Status](https://github.com/AlexanderRyzhov/frontend-project-12/workflows/hexlet-check/badge.svg)](https://github.com/AlexanderRyzhov/frontend-project-12/actions)


## Описание проекта

Учебный проект, в рамках которого разрабатывается фронтенд чат приложения Чат с использованием библиотек React, Redux, Redux toolkit.

В качестве бекэнда используется готовоая реализация от Hexlet https://github.com/hexlet-components/project-js-chat-backend

По умолчанию в системе уже зарегистрирован один пользователь, имя пользоваталя - admin, пароль - admin.

## Системные требования

[Node.js](https://nodejs.org/) v18.12

## Установка проекта

1. Склонировать репозиторий проекта
2. Запустить команду make install (установит взе зависимости как для бекенда, так и для фронтенда)
3. Произвести сборку фронтенд приложения

### Запуск проекта

#### В режиме разработки
1. запустить команду `npm run start` в корне проекта (бекенд)
2. запустить команду `npm run start` в директории `frontend` проекта (фронтенд)
3. открыть приложение в браузере по адресу http://localhost:3000

#### В продуктивном режиме
предусловие - произвести сборку приложения командой `npm run build` в корне проекта
1. запустить приложение командой `npm run start` в корне проекта (бекенд)
2. открыть приложение в браузере по адресу http://localhost:5001

### Деплой приложения на платформе Railway
https://frontend-project-12-production-e7fd.up.railway.app/