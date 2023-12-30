import { BeforeAll, AfterAll, Before, After } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import { initProperties } from "../helpers/properties/properties";
import { browserManager } from "../helpers/managers/browserManager"
const fs = require("fs-extra");

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
    initProperties();
    browser = await browserManager();
});

Before(async function () {
    //recording context
    context = await browser.newContext({
        recordVideo: {
            dir: "target/videos",
        },
    });
    //page context
    const page = await context.newPage();
    pageFixture.page = page;
});

After(async function ({ pickle }) {
    //getting paths of image and video
    let img = await pageFixture.page.screenshot({
        path: `./target/screenshots/${pickle.name}.png`, type: "png"
    })
    let videoPath = await pageFixture.page.video()?.path();

    await pageFixture.page.close();
    await context.close();

    //attach elements to html report
    await this.attach(
        img, "image/png"
    );
    await this.attach(
        fs.readFileSync(videoPath),
        'video/webm'
    );

    //rename the video file - playrightbug
    let path = `./target/videos/${pickle.name}.webm`;
    fs.rename(videoPath, path);
});

AfterAll(async function () {
    await browser.close();
});
