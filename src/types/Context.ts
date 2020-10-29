import { Response } from './Response'
import { RequestWithAuthenticationHeader } from './RequestWithAuthenticationHeader'

export type Context = {
  req: RequestWithAuthenticationHeader
  res?: Response
}
