import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { createAttachmentPresignedUrl } from '../../businessLogic/feeds'
import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const fileName = event.pathParameters.fileName
    
    const userId = getUserId(event);
    const signedUrl: string = await createAttachmentPresignedUrl(userId, fileName);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },    
      body: JSON.stringify({
        url: signedUrl
      })
    }
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
