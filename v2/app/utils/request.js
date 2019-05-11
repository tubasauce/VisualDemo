import Cookie from './cookie';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    // handle code 204 - No content is returned in response
    if (response.status === 204) {
      return {};
    }
    return response.json();
  } else if (response.status === 401) {
    window.location.href = '/login';
  } else {
    // get error message
    return response.text()
      .then((text) => {
        var message = 'Oops, there was a Server Error';
        try {
          const json = JSON.parse(text);
          if (json.error) {
            /*
              Assume error object is in the following shape:
              error: {
                  message: 'error message'
              }
            */
            message = json.error.toString();
            if (json.error.message) {
              message = json.error.message;
            }
          }
        } catch (ex) {
          console.log(ex);
          console.error(text);
        }
        throw new Error(message);
      });
  }
};

const request = (options) => {
  const defaultOptions = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-xsrf-token': Cookie.get('XSRF-TOKEN')
    },
    credentials: 'same-origin'
  };
  const url = options.url;
  options = {
    ...defaultOptions,
    ...options
  };
  if (options.body) {
    options.body = JSON.stringify(options.body);
  }
  return fetch(url, options)
    .then(checkStatus);
};

export default request;
