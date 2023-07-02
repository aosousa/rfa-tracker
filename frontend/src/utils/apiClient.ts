// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

interface ApiClientData {
  endpoint: string;
  method: string;
  data: {
    body: any;
    customConfig: any;
  };
}

export async function client(clientData: ApiClientData) {
  const headers = {
    'Content-Type': 'application/json',
  };

  const config = {
    method: clientData.method,
    ...clientData.data.customConfig,
    headers: {
      ...headers,
      ...clientData.data.customConfig.headers,
    },
  };

  if (clientData.data.body) {
    config.body = JSON.stringify(clientData.data.body);
  }

  let data;
  try {
    const response = await window.fetch(
      `http://localhost:4000/rfa-tracker-api${clientData.endpoint}`,
      config
    );

    data = await response.json();

    if (response.ok) {
      // Return a result object similar to Axios
      return {
        status: response.status,
        data,
        headers: response.headers,
        url: response.url,
      };
    }

    throw new Error(response.statusText);
  } catch (err: any) {
    return Promise.reject(err.message ? err.message : data);
  }
}

client.get = function (endpoint: string, customConfig = {}) {
  return client({
    endpoint,
    method: 'GET',
    data: {
      body: null,
      customConfig,
    },
  });
};

client.post = function (endpoint: string, body: any, customConfig = {}) {
  return client({
    endpoint,
    method: 'POST',
    data: {
      body,
      customConfig,
    },
  });
};

client.put = function (endpoint: string, body: any, customConfig = {}) {
  return client({
    endpoint,
    method: 'PUT',
    data: {
      body,
      customConfig,
    },
  });
};

client.delete = function (endpoint: string, customConfig = {}) {
  return client({
    endpoint,
    method: 'DELETE',
    data: {
      body: null,
      customConfig,
    },
  });
};
