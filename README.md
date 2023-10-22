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

_Update npm to the latest version using the command below._

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

- [x] Upload project and install dependencies (10/20/2023)
- [x] Update README.md (10/22/2023)
- [ ] Migrate from Vue 2 to Vue 3
- [ ] Add additional tools and dependencies.
- [ ] Add pagination: Implement pagination to show 100 rows per page for a better user experience.
- [ ] Color coding: Color code the table based on the "Status" column to make data interpretation
easier.
- [ ] Adding Functionality
    - [ ] Allow users to double-click on a cell to input data.
    - [ ] Input values should be single-digit integers or numbers with up to two decimal points.
    - [ ] Implement a "Save" button to save changes to the data.json file.
- [ ] Bonus Questions (Optional)
    - [ ] Implement a search bar to filter rows based on specific criteria.
    - [ ] Implement client-side sorting for each column.
    - [ ] Use state management (e.g., Vuex, Pinia) to handle data and user interactions.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- DECISIONS -->
## Decisions

- Adding ESLint and Prettier:
    - I made the decision to include these tools because, assuming we are working on a large team, it is important to maintain code consistency, catch coding errors early in the development process, reduce code review time, enforce industry best practices, and more.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- BONUS FEATURES -->
## Bonus Features

Bonus Features (if implemented): Document how users can interact with
additional functionalities.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

