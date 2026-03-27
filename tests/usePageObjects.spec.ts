import {test,expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager' 
import {faker} from '@faker-js/faker'


test.beforeEach(async({page})=>{
await page.goto('/')
})

// test('navigate to form page @smoke @regression', async({page}) =>{
//     //I commented that part after we have created page manager object
//     // const navigateTo= new NavigationPage(page)
//     const pm = new PageManager(page)

//     // await navigateTo.formLayoutsPage()
//     // await navigateTo.datepickerPage()
//     // await navigateTo.smartTablePagePage()
//     // await navigateTo.toastrPagePage()
//     // await navigateTo.tooltipPage()

//     await pm.navigateTo().smartTablePagePage()
//     await pm.navigateTo().formLayoutsPage()
//     await pm.navigateTo().toastrPagePage()
//     await pm.navigateTo().tooltipPage()
//     await pm.navigateTo().datepickerPage()

// })

// test('Fill Using the Grid form', async({page}) =>{
//     // const randomFullName=faker.person.fullName()
//     // const randomEmail=`${randomFullName}${faker.number.int(1000)}@test.com`
//     const pm = new PageManager(page)
//     await pm.navigateTo().formLayoutsPage()
//     //await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(randomEmail, 'Password', 'Option 1')
//     await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.T_USERNAME, process.env.T_PASSWORD, 'Option 1')
//     await page.screenshot({path:'screenshots/formsLayoutsPage.png'})

// })

// test('Date picker test', async({page}) =>{
//     const pm = new PageManager(page)
//     await pm.navigateTo().datepickerPage()
//     await pm.onDatePickerPage().selectDateFromDatePicker(100)

// })

// test('Date Range picker test', async({page}) =>{
//      const pm = new PageManager(page)
//      await pm.navigateTo().datepickerPage()
//      await pm.onDatePickerPage().selectDateFromDatePickerWithRange(100,105)
     

// })

test('testing with argos CI', async({page}) =>{
     const pm = new PageManager(page)
     await pm.navigateTo().datepickerPage()
    
})