Maket Home Assesment 

Objective:
Develop a simple web application with a login page and a profile page. Implement end-to-end (E2E) tests to ensure the functionality of the application, and to ensure the styling of the pages as expected (does the page render as it is expected by the UI). 

## Steps 
- Clone this repo
- Install all dependencies
  
```bash
npm i
# or
yarn i
# or
pnpm i
# or
bun i
```
- Initialize DB with
```bash
npx prisma migrate dev
```

By default this should be enough to create DB and seed. If the migration proccess does not complete the seeding, use
```bash
npx prisma db seed
```
This user will be created by default.
```JSON
  "email": "admin@admin.ai",
  "firstName": "Alfredo",
  "lastName": "Silva",
  "password": "admin",
  "bio": "An experienced System Administrator with over 8 years in IT infrastructure management. Known for a meticulous approach and proactive problem-solving, excels in network architecture, server management, and cybersecurity.",
  "isAdmin": true,
  "profileImage": "/images/admin.webp"
```

- To run this server
```bash
npm run dev
```

By default this project should run on http://localhost:3000. 

If the project starts running in another port, try changing the port to 3000 or change cypress config file to be the same base url that is running.
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Cypress

- To initialize cypress testings type
```bash
  npx cypress open
```

- After this command, a browser window will pop up and you should select `E2E Testing`.
![Cypress E2E Testing](https://i.ibb.co/C9WMLhC/E2E-Testing.png)
  
- Here our server should be running properly. If it isn't running, try using `npm run dev` to start it.
- Select Chrome and the dashboard will be initialized.
![Cypress Dashboard](https://i.ibb.co/RDRwdX7/Cypress-Dashboard.png)
