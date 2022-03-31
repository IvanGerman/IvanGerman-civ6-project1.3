const Utils = {
  parseRequestURL: () => {
    const url = document.location.hash.slice(1).toLowerCase() || '/';
    const r = url.split('/');
    const request = {
      resource: null,
    };
    request.resource = r[0];
    return request;
  },
};

export default Utils;
