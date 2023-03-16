import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { RegisterUserRequest } from '../../requests/RegisterUserRequest'
import { register } from '../../businessLogic/user'

export const handler = middy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        const registerUser: RegisterUserRequest = JSON.parse(event.body)

        if (!registerUser || !registerUser.email || !registerUser.password) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing register user' })
            }
        }
        try {
            const response = await register(registerUser);

            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    item: response
                })
            }
        } catch (e) {
            
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