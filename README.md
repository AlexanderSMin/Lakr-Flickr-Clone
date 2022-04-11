# Lakr

Live Link: https://reactsololakr.herokuapp.com/

Lakr is a clone of Flickr.
Share photos any Laker related photos on this site.

## Index
| [Database Schema](https://github.com/AlexanderSMin/reactApp/wiki/Database-Schema) | [Feature List](https://github.com/AlexanderSMin/reactApp/wiki/Feature-List) |

## Technologies

- JavaScript
- Express
- React
- HTML/CSS
- Sequelize
- VsCode


## Getting Started

1. Clone the repo.
     - `git clone https://github.com/AlexanderSMin/reactApp.git`
2. Install dependencies in the root, backend, and frontend directories.
     - `npm install`
3. Create POSTGRESQL user with CREATEDB and PASSWORD in PSQL.
     - `CREATE USER <name> WITH CREATEDB AND PASSWORD <’password’>`
4. Create a .env file in the backend.
5. The user and database names can be auth_db or replaced with another. The password is set to a desired password. The JWT_SECRET should be generated securely and the port is on 5000 or can be of a different choice.
6. A proxy should be added to the package.json of the frontend directory. The proxy can be kept the same or changed to the one set in the .env file.
     - `“proxy” : “http://localhost:5000”`
7. To create a database, migrations, and seeders, run these commands in the terminal for the backend directory.
     - `npx dotenv sequelize db:create`
     - `npx dotenv sequelize db:migrate`
8. npx dotenv sequelize db:seed:all
9. Run the application by starting the frontend as well as backend directory with the command.
     - `npm start`
10. Sign up for an account on the site or use the demo-user feature


## Features

Once logged in, users have the ability to:

- Upload/View/Edit/Delete Photos
- Upload/View/Edit/Delete Comments
