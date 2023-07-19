const apiPath = '/api/v1';

const routes = {
  signupPath: () => [apiPath, 'signup'].join('/'),
  loginPath: () => [apiPath, 'login'].join('/'),
  getData: () => [apiPath, 'data'].join('/'),
};

export default routes;
