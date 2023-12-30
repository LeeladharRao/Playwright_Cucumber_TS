import { Given, Then, setDefaultTimeout } from "@cucumber/cucumber"
import { pageFixture } from "../../hooks/pageFixture";
import SamplePage from "../../pages/samplePage";

let samplePage: SamplePage;

Given('user is on Google home page', async function () {
    samplePage = new SamplePage(pageFixture.page);
    await samplePage.navigateToGoogle();
});

Then('search for {string}', async function (word) {
    await samplePage.searchForText(word);
});

Then('search for {string} and search', async function (word) {
    await samplePage.searchForTextAndSearch(word);
});

