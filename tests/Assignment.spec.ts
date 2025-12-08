 import {test,expect} from '@playwright/test';

 test('Assingment UI Controls', async({browser})=>{
    const newContext = await browser.newContext();
    const page = await newContext.newPage();
    const userName = page.locator("input[formcontrolname='userEmail']");
    const password =page.locator("#userPassword")
    const loginbtn=page.locator("[type='submit']")
    const cardTitles = page.locator(".card-body b");
    await page.goto("https://rahulshettyacademy.com/client/auth/login");
    console.log(await page.title());
    await expect(page).toHaveTitle("Let's Shop");
    await userName.fill("mail.srinivasakc@gmail.com");
    await password.fill("password123");
    await loginbtn.click();
    console.log(await page.locator("#toast-container").textContent());
    await expect(page.locator("#toast-container")).toContainText("Incorrect email");
    // type - fill corrext password
    await password.fill("password@1234");
    await loginbtn.click();
   //  await page.waitForLoadState('networkidle'); //Discouraged fails sometimes
   //  await cardTitles.waitFor(); //muliple elements so fail
    await cardTitles.first().waitFor();
    await page.pause();
   //  await page.waitForURL("**dashboard/dash");// fials if url changes slightly
    console.log(await page.locator("#toast-container").textContent());
    // await expect(page.locator("#toast-container")).toContainText("Login Successfully");
    console.log(await page.locator(".card-body b").first().textContent());
    console.log(await page.locator(".card-body b").nth(2).textContent());
    const allTitles = await cardTitles.allTextContents();
   //  console.log(allTitles);
    
 });