const config = {
  api: {
    baseUrl: "http://localhost:9000/",
    // baseUrl: "http://202.145.0.38:9000/",
    timeout: 60000,
  },
};

export default (key) => {
  let path = key.split(".");
  let current = config;
  for (let i = 0; i < path.length; i++) {
    if (current[path[i]] == undefined) return key;
    current = current[path[i]];
  }
  return current;
};
