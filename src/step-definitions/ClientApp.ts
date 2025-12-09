import {Given, When, Then} from "@cucumber/cucumber";
import { expect,chromium} from "playwright/test";
import {POManager} from "../pages/POManager";
let orderId:any;
Given('a login to Ecommerce application with {string} and {string}', {timeout:100*1000}, async function (username, password) {
      const browser = await chromium.launch({ 
          headless: false });
       const context = await browser.newContext();
       const page = await context.newPage();
        this.poManager = new POManager(page);
     const loginPage = this.poManager.getLoginPage();
     // The '!' non-null assertion operator tells TypeScript that we are certain it is defined by this point
    //  const loginPage = this.poManager!.getLoginPage();
     await loginPage.goTo();
     await loginPage.validLogin(username,password);

  });
  When('Add {string} to Cart',{timeout:100*1000},async function (productName) {
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();
  });

  Then('Verify {string} is displayed in the Cart', async function (productName) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(productName);
    await cartPage.checkoutProduct();
  });

  When('Enter valid details and Place the Order', async function () {
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    orderId= await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await this.dashboardPage.navigateToOrders();
  });
  Then('Verify order is present in the OrderHistory', async function () {
    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
  });
