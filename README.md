## Description
Pokemon API that allows to manage Pokemons Cards with authentication.

## Requirements
- Docker & Docker Compose
- Node.js 18 or higher
- npm

## Running the app
- Run the docker-compose file to start the database
  ```bash
  $ docker compose up
  ```
- Create a .env file following the `.env.example` file
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

# Utilities
- Swagger API documentation
  - `localhost:3001/api`
- pgAdmin - Database management
  - `localhost:5050`
  - credentials: `nestjs@localhost.com / nestjs`

# Used Technologies
- NestJS
- TypeORM
- PostgreSQL
- Docker
- Swagger
- JWT Authentication

# Future improvements
- Add more validations to the entities.
- Password hashing.
- Testing
- Filtering & Pagination
- DB Seeding & Migrations
- Improve Swagger documentation
- I decided to only give one weakness and resistance to the cards to simplify the solution, so one improvement could be implement the possibility to add more than one.
- Pokemon Types could be validated to ensure they're part of the Pokemon world.

## License

Nest is [MIT licensed](LICENSE).
