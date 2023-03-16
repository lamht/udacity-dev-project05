import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { LoginUserRequest } from '../../requests/LoginUserRequest'
import { login } from '../../businessLogic/user'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const loginUser: LoginUserRequest = JSON.parse(event.body)

    if (!loginUser || !loginUser.email || !loginUser.password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing login user' })
      }
    }
    try{
        const response = await login(loginUser);

        return {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({
            item: response
          })
        }
    } catch (e){
        return {
            statusCode: 400,
            headers: {
              'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
              error: e.message
            })
          }
    }
    
  }
)

handler.use(
  cors({
    credentials: true
  })
)