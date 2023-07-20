export default {
  translation: {
    mainPage: {
      onConnect: 'soket is connected',
      onDisconnect: 'socket is disconnected',
    },
    channel: {
      remove: 'Remove',
      rename: 'Rename',
    },
    channels: {
      channels: 'Channels',
    },
    header: {
      signOut: 'signOut',
    },
    loginPage: {
      validation: {
        required: 'required field',
      },
      wrongCredentials: 'Wrong username or password',
      login: 'signIn',
      username: 'Username',
      password: 'Password',
      noAccountQuestion: 'No account? ',
      signup: 'Sign up',
    },
    messages: {
      messages_zero: 'no messges',
      messages_one: '{{count}} message',
      messages_few: '{{count}} messges',
      messages_many: '{{count}} messages',
    },
    newMessageForm: {
      sendError: 'message was not sent',
      ariaLabel: 'New message',
      placeholder: 'Messge text...',
      send: 'Send',
    },
    notFoundPage: {
      message: 'Page not found',
    },
    signupPage: {
      validation: {
        notUniqueUser: 'Username is already in use',
        required: 'required field',
        min3: 'at least 3 characters',
        max20: 'not more then 20 characters',
        min6: 'at least 6 characters',
        mustMatch: 'passwords must match',
      },
      signupCaption: 'SignUp',
      username: 'Username',
      password: 'Passwor',
      passwordConfirmation: 'Password confirmation',
      signupButton: 'SignUp',
      networkError: 'Network error, error code: {{code}}',
    },
    modals: {
      add: {
        validation: {
          required: 'Name is required',
          notUniqueName: 'Name is already in use',
        },
        title: 'New channel',
        name: 'name',
        cancel: 'cancel',
        add: 'add',
        addChannelError: 'channel was not added',
        addChannelSuccess: 'new channel was successfully added',
      },
      remove: {
        title: 'Remove channel',
        name: 'name',
        cancel: 'cancel',
        remove: 'remove',
        removeChannelError: 'channel was not removed',
        removeChannelSuccess: 'channel was successfully removed',
      },
      rename: {
        validation: {
          required: 'Name is required',
          notUniqueName: 'Name is already in use',
        },
        title: 'Rename channel',
        name: 'name',
        cancel: 'cancel',
        rename: 'rename',
        renameChannelError: 'channel was not renamed',
        renameChannelSuccess: 'channel was successfully renamed',
      },
    },
  },
};
