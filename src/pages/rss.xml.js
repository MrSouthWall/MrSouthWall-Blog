import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function GET(context) {
    return rss({
        title: "MrSouthWall's Blog | Swift",
        description: '专注于 iOS 开发，Swift 和 SwiftUI 技术分享。',
        site: context.site,
        items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),
        customData: `<language>en-us</language>`,
    });
}