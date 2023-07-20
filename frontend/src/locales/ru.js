export default {
  translation: {
    mainPage: {
      onConnect: 'связь с сервером установлена',
      onDisconnect: 'связь с сервером потеряна',
    },
    channel: {
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
      wrongCredentials: 'Неверные имя пользователя или пароль',
      login: 'Войти',
      username: 'Логин',
      password: 'Пароль',
      noAccountQuestion: 'Нет аккаунта? ',
      signup: 'Регистрация',
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
        min3: 'не меньше 3-х символов',
        max20: 'не более 20 символов',
        min6: 'не меньше 6 символов',
        mustMatch: 'пароли не совпадают',
      },
      signupCaption: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      passwordConfirmation: 'Повторите пароль',
      signupButton: 'Зарегистрироваться',
      networkError: 'Ошибка сети, код ошибки: {{code}}',
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
        addChannelSuccess: 'новый канал создан',
      },
      remove: {
        title: 'Удаление канала',
        name: 'Имя канала',
        cancel: 'отменить',
        remove: 'удалить',
        removeChannelError: 'не удалось удалить канал',
        removeChannelSuccess: 'канал удален',
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
        renameChannelSuccess: 'канал успешно переименован',
      },
    },
  },
};
