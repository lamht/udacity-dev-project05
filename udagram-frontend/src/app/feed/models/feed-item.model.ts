export interface FeedItem {
    userId: string;
    feedId: string;
    caption: string;
    attachmentUrl?: string;
}

export const feedItemMocks: FeedItem[] = [
    {
    userId: "xx",
    feedId: "xx",
    attachmentUrl: '/assets/mock/xander0.jpg',
    caption: 'Such a cute pup'
    },
    {
    userId: "xx",
    feedId: "xx",
    attachmentUrl: '/assets/mock/xander1.jpg',
    caption: 'Who\'s a good boy?'
    },
    {
    userId: "xx",
    feedId: "xx",
    attachmentUrl: '/assets/mock/xander2.jpg',
    caption: 'Majestic.'
    }
];
