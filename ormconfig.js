require('dotenv/config')
const { NODE_ENV } = process.env

const database = {
  development: 'main',
  production: 'main',
  test: 'test',
}

const config = {
  type: 'postgres',
  host: process.env.CLOUD_DATABASE_HOST,
  port: 5432,
  username: process.env.CLOUD_DATABASE_USER,
  password: process.env.CLOUD_DATABASE_PASSWORD,
  database: database[process.env.NODE_ENV],
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