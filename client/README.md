# Frontend/Client

Powered by the following technologies:

- [Vue.js](https://v3.vuejs.org/) - Frontend progressive framework (Built using Vue3)
- [Vite](https://vitejs.dev/) - Frontend tooling suite (Mostly used as a module bundler for hot reloads and running a dev server)
- [Sass/Scss](https://sass-lang.com/) - Amazing CSS preprocessor
- [Quasar](https://quasar.dev/) - Frontend Vue UI library/framework for quick development

## Usage

After cloning with your preferred method, run the following commands

> Note: This is just for deploying the frontend

```bash
cd job-app-tracker/client # CD into the client directory
yarn install # Install project's dependencies
yarn dev # Run a local server
```

By default, `yarn dev` will run the server on port 3000. So the website can be accessed through <http://localhost:3000/job-app-tracker/> (Note the `job-app-tracker` extension, this is used for the deployed Github Pages while frontend work was being done, will be changed after launch to Heroku)

If port 3000 is used on your machine, after running `yarn dev`, your shell should give you the URL that the server is running on