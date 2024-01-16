import { LaunchOptions, chromium, firefox } from "@playwright/test";

const head = process.env.HEAD as string;

const options: LaunchOptions = {
    headless: !true
}

export const browserManager = () => {
    const browserType = process.env.BROWSER as string;
    switch (browserType) {
        case "chrome":
            return chromium.launch(options);
        case "firefox":
            return firefox.launch(options);
        default:
            throw new Error("BROWSER IS NOT CONFIGURED!!!");
    }
}