import { state } from '@angular/animations'
import {expect} from '@playwright/test'
import {test} from '../test-options'

test.describe('test suite1', () => {

test.beforeEach(async({page, globalsQaURL}, testInfo)=>{
        //await page.goto('http://uitestingplayground.com/ajax')
        await page.goto(globalsQaURL)
        await page.getByText('Button Triggering AJAX Request').click()
        testInfo.setTimeout(testInfo.timeout+2000)
    })

test('testing await', async({page})=>{
  const successButton= page.getByText('Data loaded with AJAX get request.')
  //await successButton.click()

  // //const buttonContent= await successButton.textContent()
  // await successButton.waitFor({state: "attached"})
  // const buttonContent= await successButton.allTextContents()
  // //expect(buttonContent).toEqual('Data loaded with AJAX get request.')
  // expect(buttonContent).toContain('Data loaded with AJAX get request.')

  await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
   })

   test('alternative wait', async({page})=>{
  const successButton= page.getByText('Data loaded with AJAX get request.')

//implementing awaits
//----------wait for the element
//await page.waitForSelector('.bg-success')
await page.waitForResponse(process.env.URL)

  const buttonContent= await successButton.allTextContents()
  expect(buttonContent).toContain('Data loaded with AJAX get request.')

})

//timeouts
  test('timeouts', async({page})=>{
    //instructiunea aceasta face ovewrite la cea de jos
    //test.setTimeout(20000)
    //multuiply the execution time of this test by 3, the time from timeout in config file, for flacky tests
    test.slow()
    const successButton= page.locator('.bg-success')
    await successButton.click()
   // await successButton.click({timeout: 16000})

  })

})