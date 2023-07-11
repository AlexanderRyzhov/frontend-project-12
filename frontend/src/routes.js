const apiPath = '/api/v1';

const routes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  getData: () => [apiPath, 'data'].join('/'),
};

export default routes;
