let config = {
  API_URL: "https://us-central1-pwa-document-reader.cloudfunctions.net/app",
};
const localOverides = {
  API_URL: "http://localhost:5001/pwa-document-reader/us-central1/app",
};
if (window.location.hostname === "localhost") {
  config = { ...config, ...localOverides };
}

export default config;
