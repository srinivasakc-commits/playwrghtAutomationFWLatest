
import { World, setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { POManager } from '../pages/POManager';

// Define the interface for your custom world
export interface ICustomWorld extends World {
  browser: Browser;
  context: BrowserContext;
  page: Page;
  poManager: POManager;
}

// Set the world constructor to ensure Cucumber uses this structure
setWorldConstructor(World); 
