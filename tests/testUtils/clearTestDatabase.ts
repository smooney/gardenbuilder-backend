import { testConnection } from './testConnection'

/**
 * Opens up the test database, drops the schema (using passed argument),
 * and immediately closes.
 */
testConnection(true).then(() => process.exit())
