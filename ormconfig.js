require('dotenv/config')

const database = {
  development: 'gardenbuilder',
  production: 'gardenbuilder',
  test: 'test',
}

const config = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: database[process.env.NODE_ENV],
  // dropSchema: process.env.NODE_ENV === 'test',
  // entities: ['dist/**/*.entity{.ts,.js}'],
  entities: ['src/entities/*.[jt]s', 'modules/**/entities/*.[jt]s'],
  logging: process.env.NODE_ENV === 'development',
  migrationsTableName: 'migration',
  migrations: ['migration/*.js'],
  synchronize: true,
  cli: {
    migrationsDir: 'migration',
  },
}

module.exports = config