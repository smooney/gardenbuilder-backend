require('dotenv/config')

const {
  NODE_ENV,
  CLOUD_DATABASE_HOST,
  CLOUD_DATABASE_PASSWORD,
  CLOUD_DATABASE_USER,
  LOCAL_DATABASE_HOST,
  LOCAL_DATABASE_USER,
  LOCAL_DATABASE_PASSWORD,
} = process.env

const database = {
  development: 'main',
  production: 'main',
  test: 'test',
}

const config = {
  type: 'postgres',
  host: NODE_ENV === 'production' ? CLOUD_DATABASE_HOST : LOCAL_DATABASE_HOST,
  port: 5432,
  username:
    NODE_ENV === 'production' ? CLOUD_DATABASE_USER : LOCAL_DATABASE_USER,
  password:
    NODE_ENV === 'production'
      ? CLOUD_DATABASE_PASSWORD
      : LOCAL_DATABASE_PASSWORD,
  database: database[process.env.NODE_ENV],
  entities: ['dist/entities/*.js', 'modules/**/entities/*.js'],
  logging: true,
  // logging: process.env.NODE_ENV === 'development',
  migrationsTableName: 'migration',
  migrations: ['migration/*.js'],
  synchronize: true,
  cli: {
    migrationsDir: 'migration',
  },
}

module.exports = config
