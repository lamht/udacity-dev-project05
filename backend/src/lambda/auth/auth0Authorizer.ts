import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'

import { verify } from 'jsonwebtoken'
import { createLogger } from '../../utils/logger'
import { JwtPayload } from '../../auth/JwtPayload'

const logger = createLogger('auth')

const cert = `-----BEGIN CERTIFICATE-----
MIIDHTCCAgWgAwIBAgIJBspOoEXnqyD9MA0GCSqGSIb3DQEBCwUAMCwxKjAoBgNV
BAMTIWRldi14a2RveDd2OGppcWMzMTd1LnVzLmF1dGgwLmNvbTAeFw0yMzAzMDgw
MTU4MTVaFw0zNjExMTQwMTU4MTVaMCwxKjAoBgNVBAMTIWRldi14a2RveDd2OGpp
cWMzMTd1LnVzLmF1dGgwLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
ggEBALB+QSyhNjXTEzV/PCwIP0aWIl5grQmqu21XkRIjRnrDRKM1CVMkDJ2BAtJV
zPMLMgOHKPJQgCrJcI9eMuDkyHtBndLB3Fi9UloddcbxW96hiSk2btFtci5fc7E0
NzcudNTmXn2eiFYTEZlY2UC+twefUEcTa+7sgszWSJilBYOvvrZ8cICjgDnsgL99
boxHw/XIe8rn72fxzbZn+LOFLByw70dTKc3WlImvYSQ5Rk1I2bGv6/rV9rTQLnJa
EjJhtcBwOL7TFzVqGZqigTa7kYQ11OmbmR+VtBIDTcArwLYdA0zttLvNLfl7EuMD
Sp6UpLpC0vo8Ntbau9K7ymDaMj0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAd
BgNVHQ4EFgQUAxZUTcOQQWK4WSF7pEr2js1P6cowDgYDVR0PAQH/BAQDAgKEMA0G
CSqGSIb3DQEBCwUAA4IBAQCtLHWng9u5B/sAXlEM3Y/rwt1vyI1JsgJyU/CRrwbs
z06j2zB8gPLVejloc0hyvWGF8mF/far2hhUhka5Mrsd/BqYD2BlF8bluWTiTddZo
DUjDqzhv2CKsK9Dunf1gMRKLjMIZ/qcpHLKQDSgJt5csrLfUpCMkVb69DVr9hrQs
Qyl5YzcOqQEOcMmBSagKMmU9fMqrJTer+vIHbTVHvG7BP7K8MiHeNUQ4w+YCXZhr
aK+cHoSaWKKkvy8oMYHUoO+8VV/3/un6CH+BMA2iYR1jd4ciOnGftvSmR8B623bm
nEW5YAn2rzblVOV1D4sRwWCOkzkh6syONiq+gqP4HwNW
-----END CERTIFICATE-----`

export const handler = async (
  event: CustomAuthorizerEvent
): Promise<CustomAuthorizerResult> => {
  logger.info('Authorizing a user', event.authorizationToken)
  try {
    const jwtToken = verifyToken(event.authorizationToken)
    logger.info('User was authorized', jwtToken)

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    logger.error('User not authorized', { error: e.message })

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

function verifyToken(authHeader: string): JwtPayload {
  const token = getToken(authHeader)
  return verify(token, cert, {algorithms: ['RS256']}) as JwtPayload
}

function getToken(authHeader: string): string {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}
