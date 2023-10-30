<a name="readme-top"></a>

<!-- PROJECT TITLE -->
<div align="center">
  <h3 align="center">dashboard-sla</h3>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#local-setup">Local Setup</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#progress">Progress</a></li>
    <li><a href="#decisions">Decisions</a></li>
    <li><a href="#bonus-features">Bonus Features</a></li>
  </ol>
</details>

<!-- LOCAL SETUP -->

## Local Setup

### Prerequisites

Make sure you have the latest versions of node.js and npm installed.

```sh
node -v
npm -v
```

These commands should print the installed Node.js and npm versions, confirming that they are installed properly.

_If checking for versions throws an error, you can install node from https://nodejs.org/en._

Update npm to the latest version using the command below.

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo on your local machine.
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
2. Use the cd command to navigate to your project root directory in the terminal or command prompt.

3. Run the following command to install dependencies.
   ```sh
   npm install
   ```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- PROGRESS -->

## Progress

- [x] Upload project and install dependencies. (10/20/2023)
- [x] Update README.md. (10/22/2023)
- [x] Migrate from Vue 2 to Vue 3. (10/22/2023)
- [x] Add additional tools and dependencies: ESLint, Prettier. (10/22/2023)
  - [x] Add TypeScript and Vuex (Vuex for future use). (10/28/2023)
- [ ] Add pagination: Implement pagination to show 100 rows per page for a better user experience.
- [x] Color coding: Color code the table based on the "Status" column to make data interpretation
      easier. (Partially Completed: 10/29/2023)
- [ ] Adding Functionality
  - [x] Allow users to double-click on a cell to input data: See Threads Column. (Partially Completed: 10/29/2023)
  - [ ] Input values should be single-digit integers or numbers with up to two decimal points.
  - [ ] Implement a "Save" button to save changes to the data.json file.
- [ ] Bonus Questions (Optional)
  - [ ] Implement a search bar to filter rows based on specific criteria.
  - [ ] Implement client-side sorting for each column.
  - [x] Use state management (e.g., Vuex, Pinia) to handle data and user interactions. (10/29/2023)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- DECISIONS -->

## Decisions

- Migration from Vue 2 to Vue 3:

  - I looked at the official documentation for Vue and they had a guide on migrating from Vue 2 to Vue 3. I followed most of it and updated the dependencies that were there to their latest versions by editing my package.json file myself. I knew of the npm update command, but needed to also update my package.json file to the most up-to-date compatible versions. I thought that there must have been an easier way to do this and found npm-check-updates. I also saw on Vue 3 official documentation, @vitejs/plugin-vue2 dependency was now changed to @vitejs/plugin-vue, so I had to manually add that dependency. Vue also has a migration tool that I imported in package.json "@vue/compat": "^3.3.6" that I would later get rid of after migrating.

  Install npm-check-updates

  ```sh
  npm install -g npm-check-updates
  ```

  Run this command in project root directory update package.json dependencies to most recent compatible versions

  ```sh
  ncu -u
  ```

  I then deleted the node_modules folder and package-lock.json to get rid of the old dependencies and ran

  ```sh
  npm install
  ```

  My dependencies were now up-to-date using the latest versions of Vue 3 and others.

  - After my dependencies were up-to-date I needed to resolve migration build warnings. I fixed build warnings by updating the main.js file to use proper Vue 3 syntax.

  - I also updated App.vue and table.vue to use Vue 3's Composition API.

  - After migration was finished, I used Vue Devtools to inspect the migrated components for bugs, there weren't any so I uninstalled @vue/compat package and returned vite.config.js to its original code.

- Adding SASS, Bootstrap 5, ESLint, Prettier, TypeScript, Pinia, and Axios (Axios for future use):

  - I made the decision to include SASS because it offers a number of benefits for styling. The main inclination to add SASS was because of the improvements to maintainability of styling code. SASS offers variables, nesting of selectors, modularity of styles, and more.
  - I made the decision to include Bootstrap 5 because it offers a number of pre-built components and styling classes that can make development much easier. Vue 3 also integrates well with Bootstrap 5 and can help speed up development processes in a manner that still allows for enough personalization of components.
  - I made the decision to include ESLint and Prettier because I am assuming we are working on a large team. It is important to maintain code consistency, catch coding errors early in the development process, reduce code review time, enforce industry best practices, and make the development process as easy as possible.
  - I made the decision to include TypeScript because it is natively supported in Vue and specifically works well with the Compositions API and Pinia (for future http requests) which I will be using. TypeScript also offers greater type safety, which brings easier code maintainability and enhanced refactoring without the fear of introducing subtle bugs. TypeScript also comes with great tooling support in VSCode.
  - I made the decision to include Pinia because it offers state management in a much more structured and predictable way. Pinia also makes debugging problems with state management easier because of the predictable data flow and separation of concerns from components.
  - I made the decision to include Axios assuming the project ever gets big enough where we need to make http requests to a server containing our data. Axios simplifies http requests, is easy to configure, and offers many features that help monitor and control those requests.

- Color Coding and Double Click to Enter Data:

  - Sadly I was on a time crunch through a few of the final features I wanted to implement, but I'm certain if I wasn't working 30-40 hours a week and doing full-time classes I could see this through to completion within 7 days. You'll notice these two features are partially completed. The double click to enter data is more like a click in the Threads column to change the data, but it is not reflected in the data.json file yet and there is no input validation yet. Color coding is set up for the Status column, but I'd like to adjust colors more and make the colors extend across the column with a lower opacity so we can still read data easily. A good chunk of my time was used for trying to integrate TypeScript and Vuex, before I found Pinia for state management which simplified the process a lot more with TypeScript.

- Modularizing Table into Smaller Components:

  - I was in the process of modularizing table into smaller components, and managed to do so, but ran out of time to fully integrate the smaller components into table itself. I wanted to focus on atleast partially completing some of the major features as well just to show that I had an inclination of how to work with the features that were asked for.

  <p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- BONUS FEATURES -->

## Bonus Features

Bonus Features (if implemented): Document how users can interact with
additional functionalities.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
