import {test,expect} from '@playwright/test'


test.beforeEach(async({page}, testInfo)=>{
await page.goto('/')
})

test.describe('Form Layouts pagae', () =>{
  test.beforeEach(async({page}) =>  {   
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

  test('INPUT FIELDS', async({page})=> {
    const usingTheGridEmailInput = page.locator('nb-card', {hasText:"Using the Grid"}).
    getByRole('textbox', {name: "Email"})

    await usingTheGridEmailInput.fill('test@test.com')
    
    //simulates the real keyboard tapping
   // await usingTheGridEmailInput.pressSequentially('test2@test2.com')
    //delay the tapping
   // await usingTheGridEmailInput.click();
    //await usingTheGridEmailInput.clear()
    //await usingTheGridEmailInput.pressSequentially('test2@test2.com', {delay: 500})
    //generic assertion
    const inputValue= await usingTheGridEmailInput.inputValue()
    expect (inputValue).toEqual('test@test.com')

    //locator assertion
    await expect(usingTheGridEmailInput).toHaveValue('test@test.com')
  })

  test.only('RADIO BUTTONS', async({page})=> {
     const usingTheGridForm = page.locator('nb-card', {hasText:"Using the Grid"})
     //await usingTheGridForm.getByLabel('Option 1').check({force:true})

     await usingTheGridForm.getByRole('radio', {name: "Option 1"}).check({force:true})

     //how to validate that it was checked
     //generic assertion
     const radioStatus = await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()
     await expect(usingTheGridForm).toHaveScreenshot()
    //  expect(radioStatus).toBeTruthy()

    //  //locator assertion
    //  await expect(usingTheGridForm.getByRole('radio', {name: "Option 1"})).toBeChecked()

     //--
    //  await usingTheGridForm.getByRole('radio', {name: "Option 2"}).check({force:true})
    //  await expect( await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()).toBeFalsy()
    //  await expect(await usingTheGridForm.getByRole('radio', {name: "Option 2"}).isChecked()).toBeTruthy()

  })


test.describe('Checkboxes/Dropdown', () =>{
  test.describe.configure({retries:2})
  test.beforeEach(async({page}) =>  {   
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()
})

  test('CHECKBOXES', async({page}, testInfo)=> {
    if(testInfo.retry){
      //do something
      //clean the database for example 
    }
    await page.getByRole('checkbox', {name: "Hide on click"}).click({force:true})
    //more prefered to be used
    await page.getByRole('checkbox', {name: "Hide on click"}).uncheck({force:true})

    const allBoxes=page.getByRole('checkbox')
    for(const box of await allBoxes.all()){
        await box.check({force:true})
           expect(await box.isChecked()).toBeTruthy()  
    }

  })

  test('list&dropdowns', async({page})=> {
    const dropDownMenu=page.locator('ngx-header nb-select')
    await dropDownMenu.click()

     page.getByRole('list')//ul tag is available
    page.getByRole('listitem')//li tag is available

    //const optionList=page.getByRole('list').locator('nb-option')
    const optionList=page.locator('nb-option-list nb-option')
    await expect(optionList).toHaveText(["Light","Dark","Cosmic","Corporate"])
    await optionList.filter({hasText: "Cosmic"}).click()
    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    const colors={
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)",
    }

    await dropDownMenu.click()
    for(const color in colors){
       await optionList.filter({hasText: color}).click()
       await expect(header).toHaveCSS('background-color', colors[color])
       if(color!="Corporate"){
       await dropDownMenu.click()}
    }
})



  })

  })

  //--------------

  test.describe('Modal & Overlays', () =>{
  test.beforeEach(async({page}) =>  {   
    await page.getByText('Modal & Overlays').click()
  
})

  test('tooltips', async({page})=> {
      await page.getByText('Tooltip').click()
    const toolTipCard = page.locator('nb-card', {hasText:"Tooltip Placements"})
    await toolTipCard.getByRole('button', {name: "Top"}).hover()

    const tooltip= await page.locator('nb-tooltip').textContent()
    expect(tooltip).toEqual("This is a tooltip")

  })

    test('dialog', async({page})=> {
      await page.getByText('Dialog').click()
      const dialogCard = page.locator('nb-card', {hasText:"Open Dialog"})
      await dialogCard.getByRole('button', {name: "OPEN DIALOG WITH COMPONENT"}).click()

      const dialogBox= await page.locator('nb-dialog-container').textContent()
      expect(dialogBox).toContain("This is a title passed to the dialog component")

  })
  })

  test('dialog box-table', async({page})=> {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()
    //trebuie sa permitem playwrightului sa primeasca acel dialog box
    page.on('dialog', dialog =>{
      expect(dialog.message()).toEqual('Are you sure you want to delete?')
      dialog.accept()
    })


    await page.getByRole('table').locator('tr',{hasText:"mdo@gmail.com"}).locator('.nb-trash').click()
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')
  })

    test('TABLES', async({page})=> {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    //1. get the row by any test in this row
    const targetRow=page.getByRole('row',{name: "twitter@outlook.com"})
    await targetRow.locator('.nb-edit').click()

    await page.locator('input-editor').getByPlaceholder("Age").clear()
    await page.locator('input-editor').getByPlaceholder("Age").fill("45")
    await page.locator('.nb-checkmark').click()

    //2.select the row by the id column
    //in this case we cannot select the row by the name as we did previously, 
    // because could be the columns with id 11 and age 11(by id)
    //navigate on the second page
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
    const targetRowById=page.getByRole('row',{name:"11"}).filter({has: page.locator('td').nth(1).getByText('11')})
    await targetRowById.locator('.nb-edit').click()
     await page.locator('input-editor').getByPlaceholder("E-mail").clear()
    await page.locator('input-editor').getByPlaceholder("E-mail").fill("test@test.com")
    await page.locator('.nb-checkmark').click()
    //navigating by the index of the column
    await expect(targetRowById.locator('td').nth(5)).toHaveText('test@test.com')

    //3.test filter of the table
    //search by the column value
    const ages=["20","30","200"]
    for (let age of ages){
      await page.locator('input-filter').getByPlaceholder("Age").clear()
      await page.locator('input-filter').getByPlaceholder("Age").fill(age)
      await page.waitForTimeout(500)
      const ageRows=page.locator('tbody tr')

      for(let row of await ageRows.all() ){
        const cellValue= await row.locator('td').last().textContent()
        if (age =='200'){
          expect(await page.getByRole('table').textContent()).toContain("No data found")
        }else
           {expect(cellValue).toEqual(age)
        }
        
      }

    }
  })

 test('DATEPICKER', async({page})=> {
      await page.getByText('Forms').click()
      await page.getByText('Datepicker').click()

      //found the locator for the common Datepicker
      const calendarInputField=page.getByPlaceholder("Form Picker")
      await calendarInputField.click()

      let date = new Date()
      date.setDate(date.getDate() + 30)
      const expectedDate = date.getDate().toString()
      const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
      const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})

      const expectedYear=date.getFullYear()
      const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

      let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
      const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`
      while(!calendarMonthAndYear.includes(expectedMonthAndYear)){

        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
        calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
        
      }

      await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate,{exact: true}).click()
      await expect(calendarInputField).toHaveValue(dateToAssert)
 })

 test('sliders', async({page})=> {
//update attribute
const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
await tempGauge.evaluate(node =>{
  node.setAttribute('cx', '14.39')
  node.setAttribute('cy', '177.206')
})

await tempGauge.click()
 })



 



  

