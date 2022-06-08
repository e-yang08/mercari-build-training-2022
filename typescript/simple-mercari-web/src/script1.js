const puppeteer = require('puppeteer');
const _ = require('async-lodash');

module.exports = {
    execute: async function () {
        // initialize puppeteer
        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-set'],
            ignoreHTTPSErrors: true,
            headless: true
        });

        const page = await browser.newPage();
        await page.setViewport({ width: 1600, height: 1200 });

        await module.exports.openPage(page, 'PAGE URL'); // here
        await module.exports.searchPage(page, keyword); // here

        await page.waitForTimeout(6000); //　wait for search result
        await browser.close();
        return "done";
    },

    openPage: async function (page, url) {
        await page.goto(url, { waitUntil: 'networkidle0' });
    },

    // here
    searchPage: async function (page, keyword) {
        await Promise.all([
            page.waitForSelector('input#{search bar - html element ID}', { timeout: 10000 }),
        ]);
        await page.focus('input#{search bar - html element ID}');
        await page.type('input#{search bar - html element ID}', keyword);
        await page.click('input#{search start button}');
    }
}

module.exports.execute().then((res) => console.log("finished", res))