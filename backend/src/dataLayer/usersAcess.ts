import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { UserItem } from '../models/UserItem'

const XAWS = AWSXRay.captureAWS(AWS)

const logger = createLogger('UsersAccess')

export class UsersAccess {
    constructor(
        private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
        private readonly userTable = process.env.USERS_TABLE,
        private readonly createdAtIndex = process.env.USERS_CREATED_AT_INDEX
    ) { }

    async getUser(email: string): Promise<UserItem> {
        const result = await this.docClient
            .query({
                TableName: this.userTable,
                IndexName: this.createdAtIndex,
                KeyConditionExpression: 'email = :email',
                ExpressionAttributeValues: {
                    ':email': email
                }
            })
            .promise()

        logger.info("Retrieved user items", {email, "count" : result.Count})

        //const items = result.Items
        // if(result.Count > 0){
        //     return items[0] as UserItem
        // }
        return null;
    }

    async createUser(newUserItem: UserItem): Promise<UserItem> {
        await this.docClient
            .put({
                TableName: this.userTable,
                Item: newUserItem
            })
            .promise()

        logger.info("Saved new feed item", {newUserItem} )
        
        return newUserItem
    }      
}