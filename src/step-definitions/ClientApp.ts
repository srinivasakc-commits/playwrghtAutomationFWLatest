import {Given, When, Then, Before, After} from "@cucumber/cucumber";
import {expect } from "@playwright/test";
import { page } from "../support/hooks";
let orderId:any;
Given('a login to Ecommerce application with {string} and {string}', async function (username, password) {
     const loginPage = this.poManager.getLoginPage(page);
 
     await loginPage.goTo();
     await loginPage.validLogin(username,password);

  });
  When('Add {string} to Cart',async function (productName) {
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
