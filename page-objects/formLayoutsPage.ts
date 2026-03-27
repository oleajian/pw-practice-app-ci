import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayoutsPage extends HelperBase{
   
    constructor(page: Page){
    super(page)}

    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string ){
        const usingTheGridEmailInput = this.page.locator('nb-card', {hasText:"Using the Grid"})
        await usingTheGridEmailInput.getByRole('textbox',{name:"Email"}).fill(email)
        await usingTheGridEmailInput.getByRole('textbox', {name: "Password"}).fill(password)
        await usingTheGridEmailInput.getByRole('radio' , {name: optionText}).check({force:true})
        await usingTheGridEmailInput.getByRole('button').click()
    }

}