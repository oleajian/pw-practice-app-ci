import {test,expect} from '@playwright/test'

test.describe('test suite1', () => {

test.beforeEach(async({page})=>{
        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('Locator syntax rules', async({page})=>{
      //by Tag name
      page.locator('input')

      //by ID
      page.locator('#inputEmail1')

      //by class value
      page.locator('.shape-rectangle')

      //by attribute
      page.locator('[placeholder="Email"]')

      //by class value(full)
      page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

      //combine different selectors
      await page.locator('input[placeholder="Email"]#inputEmail1').click()

      //by whole text match
      page.locator(':text-is("Using the Grid")')


    })

   test('Use facing locators', async({page})=>{ 
    await page.getByRole('textbox', {name:"Email"}).nth(1).click()
    await page.getByLabel('Email').first().click()
    await page.getByPlaceholder('Jane Doe').click()
    await page.getByText('Using the Grid').click()
    await page.getByTestId('Signin').click()

   })

      test('Use child locators', async({page})=>{ 
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').getByRole('button', {name:"Sign in"}).first().click()

   })

         test('Use parent locators', async({page})=>{ 
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('button', {name:"Sign in"}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).click()

   // await page.locator('nb-card').filter({has: page.locator('#inputEmail1')}).click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).locator('#exampleInputEmail1').click()
   })
})

test.describe('test suite2', () => {

  test.beforeEach(async({page})=>{
        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

  test('Reusing locators', async({page})=>{
    const basicForm=page.locator('nb-card').filter({ hasText: 'Basic form' })
    const email=basicForm.getByRole('textbox', { name: 'Email' })

    await email.fill('test@test.com')
    await basicForm.getByRole('textbox', { name: 'Password' }).fill('12345')
    await basicForm.getByRole('button').click()

    await expect(email).toHaveValue('test@test.com')})

  test('Extracting values', async({page})=>{
     //single test value
    const basicForm=page.locator('nb-card').filter({ hasText: 'Basic form' })
    const submitValue = await basicForm.getByRole('button', {name:'Submit'}).textContent()
    expect(submitValue).toEqual('Submit')

    //all text values
    const allTextValues = await page.locator('nb-radio').allTextContents()
    expect(allTextValues).toContain('Option 1')

    //inspect input value
    const emailField = basicForm.getByRole('textbox', {name: 'email'})
    await emailField.fill('test@test.com')
    const emailValue=await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    //get the name of an attribute(placeholder in this case)
    const placeHolder=await emailField.getAttribute('placeholder')
    expect(placeHolder).toEqual('Email')

    })

  test('assertions', async({page})=>{
    //general assertions
    //as we did previously 
    const basicForm=page.locator('nb-card').filter({ hasText: 'Basic form' }).locator('button')

    const text = await basicForm.textContent()
    expect(text).toEqual('Submit')

    //locator assertions
    //we can make the same assertin usong locator assetrions, and here it is necessary to put await locator before
    await expect(basicForm).toHaveText('Submit')

    //Soft assertions
    //the execution continues even if the assertion failes
    await expect.soft(basicForm).toHaveText('Submit')

    })
  
  })


