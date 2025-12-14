import { Browser, BrowserContext, chromium, Page } from "@playwright/test";
import { POManager } from "../pages/POManager";
import { After, AfterStep, Before, setDefaultTimeout,Status} from "@cucumber/cucumber";
setDefaultTimeout(60 * 1000);
let browser:Browser;
let context: BrowserContext;
let page:Page;
Before(async function(){
  browser = await chromium.launch
        ({ 
          headless: false
         });
      context = await browser.newContext();
      page = await context.newPage();
      this.poManager = new POManager(page);
});
After(async function () {
  page.close();
  context.close();
  browser.close();
console.log('finished execution of test suite')
});

AfterStep( async function ({result}) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
    await page.screenshot({path:'screenshot1.png'});
  }
});
export{page};