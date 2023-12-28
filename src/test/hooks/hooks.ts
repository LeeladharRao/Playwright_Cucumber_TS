import { BeforeAll, AfterAll, Before, After, AfterStep } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium } from "@playwright/test";
import { pageFixture } from "./pageFixture";

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
    browser = await chromium.launch({headless: false});
})

Before(async function () {
    context = await browser.newContext();
    const page = await browser.newPage();
    pageFixture.page = page;
})

AfterStep(async function ({pickle}) {
    const img = await pageFixture.page.screenshot({path: "./target/screenshots/"+pickle.name+".png"})
    await this.attach(img, "image/png");
})

After(async function () {
    await pageFixture.page.close();
    await context.close();
})

AfterAll(async function () {
    await browser.close();
})