import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateFeedRequest } from '../../requests/CreateFeedRequest'
import { getUserId } from '../utils';
import { createFeed } from '../../businessLogic/feeds'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newFeed: CreateFeedRequest = JSON.parse(event.body)
    // Feed: Implement creating a new Feed item
    const userId = getUserId(event);

    if (!newFeed || !newFeed.caption || !newFeed.url) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing Feed Caption' })
      }
    }

    const newFeedItem = await createFeed(userId, newFeed);

    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        item: newFeedItem
      })
    }
  }
)

handler.use(
  cors({
    credentials: true
  })
)
