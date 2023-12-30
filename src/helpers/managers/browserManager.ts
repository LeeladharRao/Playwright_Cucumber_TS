import { LaunchOptions, chromium, firefox } from "@playwright/test";

const options: LaunchOptions = {
    headless: !process.env.HEAD
}

export const browserManager = () => {
    const browserType = process.env.BROWSER;
    switch (browserType) {
        case "chrome":
            return chromium.launch(options);
        case "firefox":
            return firefox.launch(options);
        default:
            throw new Error("BROWSER IS NOT CONFIGURED!!!");
    }
}