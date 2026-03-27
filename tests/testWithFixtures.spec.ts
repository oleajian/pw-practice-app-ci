import {test} from '../test-options'
// import { PageManager } from '../page-objects/pageManager' 
import {faker} from '@faker-js/faker'



test('Fill Using the Grid form', async({pageManager}) =>{
    // const randomFullName=faker.person.fullName()
    // // const randomEmail=`${randomFullName}${faker.number.int(1000)}@test.com`
    // const pm = new PageManager(page)

    //await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(randomEmail, 'Password', 'Option 1')
    await pageManager.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.T_USERNAME, process.env.T_PASSWORD, 'Option 1')
    // await page.screenshot({path:'screenshots/formsLayoutsPage.png'})

})

