# Gardenbuilder

GraphQL API and database interface for Gardenbuilder

## About

Made with Typescript, TypeORM, Postgres and GraphQL

## Getting Started

### Setup

You'll need to also set up a postgresql database named gardenbuilder. I would follow the directions [here](https://tutorial-extensions.djangogirls.org/en/optional_postgresql_installation/).

Alternatively, you could run postgresql locally using docker: `docker run -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -e POSTGRES_DB=gardenbuilder -p 127.0.0.1:5432:5432/tcp library/postgres`

Finally, you'll need to add the following into the `.env` file at the root of the project:

```
LOCAL_DATABASE_HOST=localhost
LOCAL_DATABASE_USER=yourUserName
LOCAL_DATABASE_PASSWORD=yourPassword
PORT=8000
```

### To Run

At project root, type `npm run start:dev`. This will start the API. You'll want to open up a second terminal at root and type `npm run watch` so that your code changes are compiled from typescript to javascript as you save them. 

Then navigate to [localhost:8000/graphql](http://localhost:8000/graphql).
You should see the graphiQL editor and be able to write queries like

```graphql
query {
  gardens {
    name
  }
}
```

### To Run Tests

TODO: Add test instructions

## Contributing

For Contributing, Read our [Contribution Guidelines](https://github.com/gardenbuilder/gardenbuilder-backend-typescript/blob/master/CONTRIBUTING.md#contributing)


## Contact

Questions? Feel free to contact Dave at `capndavet@gmail.com`.