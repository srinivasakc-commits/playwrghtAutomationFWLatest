import { Browser, BrowserContext, chromium, expect, Page } from "@playwright/test";
import { POManager } from "../pages/POManager";
import { After, Before, setDefaultTimeout } from "@cucumber/cucumber";
setDefaultTimeout(60 * 1000);
let browser:Browser;
let context: BrowserContext;
let page:Page;
Before(async function(){
const browser = await chromium.launch
        ({ 
          headless: false
         });
      context = await browser.newContext();
      page = await context.newPage();
      this.poManager = new POManager(page);
});
After(async function () {

//   page.close();
//   context.close();
//   browser.close()
console.log('Scenaio Completed')
});
export{page};