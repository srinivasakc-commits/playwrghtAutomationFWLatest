import { Before, After } from "@cucumber/cucumber";
import {CustomWorld} from "../support/world";
// Use 'this: CustomWorld' to get access to the initialized methods
Before(async function (this: CustomWorld) {
    // Call the initialization method defined in the CustomWorld constructor
    await this.initializePlaywright();
});

After(async function (this: CustomWorld) {
    console.log("The end of the test");
    await this.closeBrowser();
});
