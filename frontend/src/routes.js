const apiPath = '/api/v1';

const routes = {
  signupApiPath: () => [apiPath, 'signup'].join('/'),
  loginApiPath: () => [apiPath, 'login'].join('/'),
  getData: () => [apiPath, 'data'].join('/'),
  rootPage: () => '/',
  signupPage: () => '/signup',
  loginPage: () => '/login',
};

export default routes;
