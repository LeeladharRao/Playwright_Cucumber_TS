import { setDefaultTimeout } from "@cucumber/cucumber";
import { Page } from "@playwright/test";

setDefaultTimeout(60 * 1000 * 5);

export default class BasePage {

    constructor(private page: Page) { }

    //common functions goes here
}