import ExcelJS from "exceljs";
import { test, expect } from '@playwright/test';
import * as path from 'path';

// --- Excel Helper Functions (place these in a separate utility file in a real project, e.g., 'excelUtils.ts') ---

/**
 * Updates a specific cell in an Excel file.
 * @param searchText The value to find in the sheet.
 * @param replaceText The new value to write.
 * @param change An object specifying column offset {colChange: number}.
 * @param filePath The path to the Excel file.
 */
async function writeExcelTest(searchText: any, replaceText: any, change: { colChange: number }, filePath: string) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    // Note: The type assertion is cleaner here if you trust your data structure.
    const worksheet = workbook.getWorksheet('Sheet1') as ExcelJS.Worksheet; 
    
    // Read the current cell coordinates
    const output = await readExcel(worksheet, searchText);
    
    // Update the target cell (e.g., if you found the header 'Status', 
    // you might want to write the result in the next column)
    const cell = worksheet.getCell(output.row, output.column + change.colChange);
    cell.value = replaceText;
    
    // Save the changes back to the file
    await workbook.xlsx.writeFile(filePath);
}

/**
 * Finds the row and column number for a specific search term.
 * @param worksheet The ExcelJS Worksheet object.
 * @param searchText The value to search for.
 * @returns An object containing the row and column number.
 */
async function readExcel(worksheet: ExcelJS.Worksheet, searchText: any) {
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        });
    });
    return output;
}

// --- Playwright Test ---

test('Verify I can update a cell in an Excel file using Playwright helpers', async ({ page }) => {
    // Define the path to your test data file
    const filePath = path.join(__dirname, 'testdata.xlsx');
    const searchTerm = 'Playwright Status'; // Example: A header in your Excel file
    const resultText = 'Passed'; // The value you want to write
    
    // Assume you had a scenario that determined this 'Passed' result.
    // Replace the cell that is 1 column to the right of the search term 'Playwright Status'
    await writeExcelTest(searchTerm, resultText, { colChange: 1 }, filePath);
    
    console.log(`Successfully updated ${searchTerm} in the excel file.`);
    
    // You might also add an assertion here to re-read the file and verify the change
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1') as ExcelJS.Worksheet;
    const coords = await readExcel(worksheet, resultText);
    
    expect(coords.row).toBeGreaterThan(-1);
    expect(coords.column).toBe(2); // If 'Playwright Status' was in column 1
});
//update Mango Price to 350. 
//writeExcelTest("Mango",350,{rowChange:0,colChange:2},"/Users/rahulshetty/downloads/excelTest.xlsx");
test('Upload download excel validation',async ({page})=>
{
  const textSearch = 'Mango';
  const updateValue = '350';
  await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button',{name:'Download'}).click();
  await downloadPromise;
  writeExcelTest(textSearch,updateValue,{rowChange:0,colChange:2},"/Users/rahulshetty/downloads/download.xlsx");
  await page.locator("#fileinput").click();
  await page.locator("#fileinput").setInputFiles("/Users/rahulshetty/downloads/download.xlsx");
  const textlocator = page.getByText(textSearch);
  const desiredRow = await page.getByRole('row').filter({has :textlocator });
  await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);

})







