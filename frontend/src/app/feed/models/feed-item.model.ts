export interface FeedItem {
    userId: string;
    feedId: string;
    url: string;
    caption: string;
    createdAt: string;
}

export const feedItemMocks: FeedItem[] = [
    {
    userId: "s",
    feedId: "d",
    url: '/assets/mock/xander0.jpg',
    caption: 'Such a cute pup',
    createdAt:"2022-01-01"
    },
    {
    userId: "s",
    feedId: "d",
    url: '/assets/mock/xander1.jpg',
    caption: 'Who\'s a good boy?',
    createdAt:"2022-01-01"
    },
    {
    userId: "s",
    feedId: "d",
    url: '/assets/mock/xander2.jpg',
    caption: 'Majestic.',
    createdAt:"2022-01-01"
    }
];
