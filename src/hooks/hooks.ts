import { BeforeAll, AfterAll, Before, After, AfterStep } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import { initProperties } from "../helpers/properties/properties";
import {browserManager} from "../helpers/managers/browserManager"
const fs = require("fs-extra");

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
    initProperties();
    browser =  await browserManager();
    context = await browser.newContext({
        recordVideo: {
            dir: "target/videos",
        },
    });
});

Before(async function ({pickle}) {
    const scenarioName = pickle.name +" "+pickle.id;
    const page = await browser.newPage();
    pageFixture.page = page;
});

AfterStep(async function ({pickle}) {
    let img = await pageFixture.page.screenshot({path: "./target/screenshots/"+pickle.name+".png"})
    await this.attach(img, "image/png");
});

AfterAll(async function () {
    await pageFixture.page.close();
    await context.close();
    await browser.close();
});