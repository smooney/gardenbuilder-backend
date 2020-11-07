import { Response } from '../types/Response'

/**
 * Return an Response object with an error > message property
 * @param [string] errorMessage
 * @returns [Object]
 */
export const errorResponse = (errorMessage: string): Response => ({
  errors: [
    {
      message: errorMessage,
    },
  ],
})
