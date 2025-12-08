import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import { BrowserContext, Page, chromium, Browser } from '@playwright/test';
import { POManager } from '../pages/POManager';

export class CustomWorld extends World {
  browser: Browser | undefined;
  context: BrowserContext | undefined;
  page: Page | undefined;
  poManager: POManager | undefined;

  constructor(options: IWorldOptions) {
    super(options);
  }

  // A method to initialize Playwright and your Page Objects
  async initializePlaywright() {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.poManager = new POManager(this.page);
  }

  async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

// Register this custom class with Cucumber
setWorldConstructor(CustomWorld);
