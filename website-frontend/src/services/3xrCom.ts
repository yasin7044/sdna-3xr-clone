// SPDX-License-Identifier: Apache-2.0
import axios from 'axios';
import store from '@/store/index';

function getBaseURL() {
  // supports VUE_APP_BACKEND_URL environment variable in a .env file
  // definition as either "dev.3xr.com" or "localhost:{PORT}"
  const fallbackURL = 'http://3a28-2405-201-500c-508d-91fe-13a3-4ed4-4cde.in.ngrok.io/a';
  const { VUE_APP_BACKEND_URL = fallbackURL } = process.env;

  return VUE_APP_BACKEND_URL.startsWith('http') ? VUE_APP_BACKEND_URL : `https://${VUE_APP_BACKEND_URL}/a`;
}

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  function (success) {
    // Nothing to do currently
    return success;
  },
  function (error) {
    if (!error.response) {
      return Promise.reject(error);
    }
    // If 403, log the user out or show a message
    if (error.response.status == 403) {
      // Change the message from "Request failed with status code 403"
      error.message = 'Unauthorized'
      // get previous query params
      const { query } = error.response.data;
      store.dispatch.user.authenticationError(query);
    }
    if (error.response.status == 500) {
      error.message = error.response.data || 'The server encountered an error';
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
