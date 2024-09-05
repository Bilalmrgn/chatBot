import * as cheerio from 'cheerio';
import https from 'https';
import fetch from 'node-fetch';

export async function processUrl(url: string, depth: number = 1) {
    try {
        if (depth === 0) {
            return [];
        }

        console.log("Başlıyor, URL:", url);

        // Fetch ile belirtilen URL'deki içeriği alırız
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'text/html',
            },
            agent: new https.Agent({ rejectUnauthorized: false }) // SSL sertifikasını devre dışı bırakır
        });

        console.log("İstek tamamlandı.");

        if (!response.ok) {
            throw new Error(`URL'den içerik alınamadı. Durum Kodu: ${response.status}`);
        }

        const html = await response.text();
        console.log("HTML alındı:");

        if (!html) {
            throw new Error("URL içeriği alınamadı veya boş.");
        }

        const $ = cheerio.load(html);
        const content: string[] = [];
        $('p, h1, h2, h3').each((i, elem) => {
            content.push($(elem).text());
        });

        const links: string[] = $('a[href^="http"]').map((i, elem) => $(elem).attr('href')!).get();
        for (const link of links) {
            try {
                const nestedContent = await processUrl(link, depth - 1);
                content.push(...(nestedContent || []));
            } catch (error) {
                console.error(`Failed to process nested URL: ${link}`, error);
            }
        }

        return content;
    } catch (error:any) {
        console.error(`Failed to process URL: ${url}`, error.message);
        return [];
    }
}
