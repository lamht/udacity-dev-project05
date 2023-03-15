import { FeedsAccess } from '../dataLayer/feedsAcess'
import { AttachmentUtils } from '../helpers/attachmentUtils';
import { FeedItem } from '../models/FeedItem'
import { CreateFeedRequest } from '../requests/CreateFeedRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'

const logger = createLogger('Feed-Business-Logic') 
const feedsAccess = new FeedsAccess()
const attachmentUtils = new AttachmentUtils()

// TODO: Implement businessLogic
export async function createFeed(userId: string, newFeed: CreateFeedRequest): Promise<FeedItem>{
    logger.info(`create Feed: user ${userId}, data ${newFeed}`);
    const feedId = uuid.v4();
    logger.info('Create Feed with generated uuid', { feedId });

    const newFeedItem: FeedItem = {
        userId,
        feedId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...newFeed
    }

    return await feedsAccess.createFeed(newFeedItem);
}

export async function getFeedsForUser(userId: string): Promise<FeedItem[]>{
    return await feedsAccess.getFeeds(userId)
}

export async function deleteFeed(userId: string, feedId: string){
    logger.info(`delete Feed, userId ${userId}, feedId ${feedId}`);
    return await feedsAccess.deleteFeed(userId, feedId)
}

export async function createAttachmentPresignedUrl(userId: string, feedId: string, fileName: string): Promise<string>{
    logger.info(`create Presigned Url, userId ${userId}, feedId ${feedId}, fileName ${fileName}`);
    const resignedUrl =  await attachmentUtils.getSignedUrl(feedId);
    const s3Link = resignedUrl.split("?")[0];
    await feedsAccess.updateAttachmentUrl(userId, feedId, s3Link);
    return resignedUrl;
}

// export async function updateFeed(userId: string, feedId: string, updatedFeed: UpdateFeedRequest) {
//     logger.info(`update Feed, userId ${userId}, feedId ${feedId}, data ${JSON.stringify(updatedFeed)}`);
//     return await FeedsAccess.updateFeed(userId, feedId, updatedFeed)
// }