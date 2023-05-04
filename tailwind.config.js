/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './Client/**/*.{js,jsx,ts,tsx}', // all files with this extension are covered
    './node_modules/flowbite/**/*.js',
    './node_modules/flowbite-react/**/*.js',
  ],
  theme: {
    extend: {},
    colors: {
      col1: '#e2f3f5',
      col2: '#22d1ee',
      col3: '#3d5af1',
      col4: '#0e153a',
      mirispink: '#EAC7C7',
      mirisblue: '#A0C3D2',
      mirisyellow: '#FFE0AC',
      miriswhite: '#F7F5EB',
      mirisbeige: '#EAE0DA',
    },
  },
  plugins: [require('flowbite/plugin')],
};
