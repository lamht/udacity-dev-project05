export interface FeedItem {
    userId: string;
    feedId: string;
    url: string;
    caption: string;
}

export const feedItemMocks: FeedItem[] = [
    {
    userId: "s",
    feedId: "d",
    url: '/assets/mock/xander0.jpg',
    caption: 'Such a cute pup'
    },
    {
    userId: "s",
    feedId: "d",
    url: '/assets/mock/xander1.jpg',
    caption: 'Who\'s a good boy?'
    },
    {
    userId: "s",
    feedId: "d",
    url: '/assets/mock/xander2.jpg',
    caption: 'Majestic.'
    }
];
