const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "text-color": "var(--text-color)",
        "background-color": "var(--background-color)"
      }
    }
  },

  plugins: []
};

module.exports = config;