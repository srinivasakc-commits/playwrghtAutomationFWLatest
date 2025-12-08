import { expect, type Locator,type Page } from '@playwright/test';

export class CartPage {
    readonly page:Page
    readonly cartProducts: Locator;
    readonly productsText: Locator;
    readonly cart: Locator;
    readonly orders: Locator;
    readonly btnCheckout: Locator;

    // Constructor with type hinting for 'page'
    constructor(page: Page) {
        this.page = page;
        // Assign locators upon instantiation
        this.cartProducts = page.locator("div li").first();
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
        this.btnCheckout = page.locator("text=Checkout");
    }

    // Async method with type hinting for 'productName' (string) and return type (void)
    async verifyProductIsDisplayed(productName: string):Promise<void> {
        // Use lowercase 'v' for method names in standard TS practice
        await this.cartProducts.waitFor();
        const productLocator = this.getProductLocator(productName);
        await expect(productLocator).toBeVisible(); 
        const bool =await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();
    }

    // Async method with return type (void)
    async checkout():Promise<void> {
        // Use lowercase 'c' for method names in standard TS practice
        await this.btnCheckout.click();
    }

    // Private helper method returns a Locator, with type hinting for 'productName' (string)
     getProductLocator(productName:string): Locator {
        return this.page.locator(`h3:has-text('${productName}')`);
    }
}