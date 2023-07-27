export default {
  translation: {
    mainPage: {
      onConnect: 'связь с сервером установлена',
      onDisconnect: 'связь с сервером потеряна',
      fetchDataError: 'возникла ошибка при загрузке данных',
    },
    channel: {
      manage: 'Управление каналом',
      remove: 'Удалить',
      rename: 'Переименовать',
    },
    channels: {
      channels: 'Каналы',
    },
    header: {
      signOut: 'Выйти',
    },
    loginPage: {
      validation: {
        required: 'обязательное поле',
      },
      username: 'Ваш ник',
      password: 'Пароль',
      login: 'Войти',
      wrongCredentials: 'Неверные имя пользователя или пароль',
      noAccountQuestion: 'Нет аккаунта? ',
      signup: 'Регистрация',
      networkError: 'Ошибка соединения',
    },
    messages: {
      messages_zero: 'нет сообщений',
      messages_one: '{{count}} сообщение',
      messages_few: '{{count}} сообщения',
      messages_many: '{{count}} сообщений',
    },
    newMessageForm: {
      sendError: 'сообщение не отправлено',
      ariaLabel: 'Новое сообщение',
      placeholder: 'Введите сообщение...',
      send: 'Отправить',
    },
    notFoundPage: {
      message: 'Страница не найдена',
    },
    signupPage: {
      validation: {
        notUniqueUser: 'Такой пользователь уже существует',
        required: 'обязательное поле',
        min3: 'От 3 до 20 символов',
        max20: 'От 3 до 20 символов',
        min6: 'Не менее 6 символов',
        mustMatch: 'Пароли должны совпадать',
      },
      signupCaption: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      passwordConfirmation: 'Подтвердите пароль',
      signupButton: 'Зарегистрироваться',
      networkError: 'Ошибка соединения',
    },
    modals: {
      add: {
        validation: {
          required: 'Укажите имя канала',
          notUniqueName: 'Данное имя канала уже занято',
        },
        title: 'Новый канал',
        name: 'Имя канала',
        cancel: 'отменить',
        add: 'создать',
        addChannelError: 'не удалось создать канал',
        addChannelSuccess: 'Канал создан',
      },
      remove: {
        title: 'Удаление канала',
        name: 'Имя канала',
        cancel: 'отменить',
        remove: 'удалить',
        removeChannelError: 'не удалось удалить канал',
        removeChannelSuccess: 'Канал удалён',
      },
      rename: {
        validation: {
          required: 'Укажите имя канала',
          notUniqueName: 'Данное имя канала уже занято',
        },
        title: 'Переименование канала',
        name: 'Имя канала',
        cancel: 'отменить',
        rename: 'переименовать',
        renameChannelError: 'не удалось переименовать канал',
        renameChannelSuccess: 'Канал переименован',
      },
    },
  },
};
