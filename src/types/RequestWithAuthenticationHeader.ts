import { Request } from 'apollo-server'

type Header = {
  authorization?: string
}

export interface RequestWithAuthenticationHeader extends Request {
  headers: Header
}
