## Description
Pokemon API that allows to manage Pokemons Cards with authentication.

## Requirements
- Docker & Docker Compose
- Node.js 18 or higher
- npm

# Used Technologies
- NestJS
- TypeORM
- PostgreSQL
- Docker
- Swagger
- JWT Authentication

## Running the app

- Create a .env file following the `.env.example` file
  
- Run the docker compose file to start the database
  ```bash
  $ docker compose up
  ```
- Install dependencies
  ```bash
  $ npm install
  ```
- Run the app
  ```bash
  # development
  $ npm run start

  # watch mode
  $ npm run start:dev

  # production mode
  $ npm run start:prod
  ```
- (Optional) You can use the `request.http` file to test the API using the REST Client extension for VSCode. There, you can find a set of example Pokemon cards to bulk create.

# Utilities
- Swagger API documentation
  - `localhost:3001/api`
- pgAdmin - Database management
  - `localhost:5050`
  - credentials: `nestjs@localhost.com / nestjs`

# Future improvements
- Testing
- Filtering & Pagination
- DB Seeding & Migrations. (I created a bulk create endpoint for now)
- Improve error handling.
- Password hashing.
- Add more validations to the entities.
- Improve Swagger documentation
- I decided to only give one weakness and resistance to the cards to simplify the solution, so one improvement could be implement the possibility to add more than one.
- Pokemon Types could be validated to ensure they're part of the Pokemon world.
- Get more information from the Pokemon API to enrich the cards. Right now it's grabbing only the image.

## License

Nest is [MIT licensed](LICENSE).
