import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DeleteItemOutput, DocumentClient, UpdateItemOutput } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { FeedItem } from '../models/FeedItem'

const XAWS = AWSXRay.captureAWS(AWS)

const logger = createLogger('FeedsAccess')

export class FeedsAccess {
    constructor(
        private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
        private readonly feedsTable = process.env.feedS_TABLE,
        private readonly createdAtIndex = process.env.feedS_CREATED_AT_INDEX
    ) { }

    async getFeeds(userId: string): Promise<FeedItem[]> {
        const result = await this.docClient
            .query({
                TableName: this.feedsTable,
                IndexName: this.createdAtIndex,
                KeyConditionExpression: 'userId = :userId',
                ExpressionAttributeValues: {
                    ':userId': userId
                }
            })
            .promise()

        logger.info("Retrieved feed items", {userId, "count" : result.Count})

        const items = result.Items

        return items as FeedItem[]
    }

    async createFeed(newFeedItem: FeedItem): Promise<FeedItem> {
        await this.docClient
            .put({
                TableName: this.feedsTable,
                Item: newFeedItem
            })
            .promise()

        logger.info("Saved new feed item", {newFeedItem} )
        
        return newFeedItem
    }    

    async deleteFeed(userId: string, feedId: string) {
        const deleteItem:DeleteItemOutput = await this.docClient
            .delete({
                TableName: this.feedsTable,
                Key: {feedId, userId},
                ReturnValues: "ALL_OLD"
            })
            .promise()

        const deletedfeed = deleteItem.Attributes

        logger.info("Deleted feed item", {deletedfeed})    
    }  
    
    // async updatefeed(userId: string, feedId: string, updatedProperties: UpdatefeedRequest) {
    //     const updateItem: UpdateItemOutput= await this.docClient
    //         .update({
    //             TableName: this.feedsTable,
    //             Key: {feedId, userId},
    //             ReturnValues: "ALL_NEW",
    //             UpdateExpression:
    //               'set #name = :name, #dueDate = :duedate, #done = :done',
    //             ExpressionAttributeValues: {
    //               ':name': updatedProperties.name,
    //               ':duedate': updatedProperties.dueDate,
    //               ':done': updatedProperties.done
    //             },
    //             ExpressionAttributeNames: {
    //               '#name': 'name',
    //               '#dueDate': 'dueDate',
    //               '#done': 'done'
    //             }
    //         })
    //         .promise()

    //     const updatedfeed = updateItem.Attributes

    //     logger.info("Updated feed item", {updatedfeed} )
    // }

    async updateAttachmentUrl(userId: string, feedId: string, attachmentUrl: string) {
        const updatedAt = new Date().toISOString();
        const updateItem: UpdateItemOutput = await this.docClient
            .update({
                TableName: this.feedsTable,
                Key: {feedId, userId},
                ReturnValues: "ALL_NEW",
                UpdateExpression:
                  'set #attachmentUrl = :attachmentUrl, #updatedAt = :updatedAt',
                ExpressionAttributeValues: {
                  ':attachmentUrl': attachmentUrl,
                  ':updatedAt': updatedAt
                },
                ExpressionAttributeNames: {
                  '#attachmentUrl': 'attachmentUrl',
                  '#updatedAt': 'updatedAt'
                }
            })
            .promise()

        const updatedfeed = updateItem.Attributes

        logger.info("Updated attachmentUrl of feed item", {updatedfeed} )
    }    
}