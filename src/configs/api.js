import templatifyURL from 'utils/templatify-url';

const API_HOST = 'http://api.io';

export const APP = {};

// accounts
APP.ROOT = API_HOST + '/accounts';
APP.COMBO = templatifyURL(APP.ROOT + '/{accountId}');

