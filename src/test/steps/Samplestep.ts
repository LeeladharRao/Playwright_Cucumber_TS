import { Given, Then, setDefaultTimeout } from "@cucumber/cucumber"
import { pageFixture } from "../hooks/pageFixture";

setDefaultTimeout(60*1000 * 5);

Given('user is on Google home page', async function () {
    await pageFixture.page.goto("https://www.google.com/");
    await pageFixture.page.waitForTimeout(3000);
});

Then('search for playwright', async function () {
    await pageFixture.page.locator("//textarea[@title='Search']").fill("Playwright");
});