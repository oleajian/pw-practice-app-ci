import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase{
   //I commented these two rows because added the inherited helperBase
    // readonly page: Page

    constructor(page: Page){
        super(page)
        //commented this one and changed to super because the same constructor where in two classes
//this.page=page
    }

    async formLayoutsPage(){
     // await this.page.getByText('Forms').click()
      await this.selectGroupMenuItem('Forms')
      await this.page.getByText('Form Layouts').click()
      await this.waitForNumberOfSeconds(2)
    }

    async datepickerPage(){
      //await this.page.getByText('Forms').click()
      await this.selectGroupMenuItem('Forms')
      await this.page.getByText('Datepicker').click()
    }

    async smartTablePagePage(){
        await this.selectGroupMenuItem('Tables & Data')
       await this.page.getByText('Smart Table').click()
    }

    async toastrPagePage(){
         await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Toastr').click()
  
    }

    async tooltipPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()

    }

    private async selectGroupMenuItem(groupItemTitle: string){
        const groupMenuItem=this.page.getByTitle(groupItemTitle)
        const expendedState=await groupMenuItem.getAttribute('aria-expanded') 
        if (expendedState == "false"){
            await groupMenuItem.click()
        }
    }

}