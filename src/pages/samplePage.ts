import { Page } from "@playwright/test";
import BasePage from "./basePage";

export default class SamplePage {

    private base: BasePage;

    constructor(private page: Page) {
        this.base = new BasePage(page);
    }

    private Elements = {
        searchBox: "//textarea[@title='Search']",
        searchBtn: "(//input[@value='Google Search'])[2]"
    }

    /**
     * this will navigate to url
     */
    async navigateToGoogle() {
        await this.page.goto(process.env.BASEURL as string);
        await this.page.waitForTimeout(3000);
    }

    /**
     * this will enter text
     */
    async searchForText(word: string) {
        await this.page.locator(this.Elements.searchBox).fill(word);
    }

    /**
     * this will enter text and search
     */
    async searchForTextAndSearch(word: string) {
        this.searchForText(word);
        await this.page.waitForTimeout(3000);
        await this.page.locator(this.Elements.searchBtn).click();
        await this.page.waitForTimeout(3000);
    }

}