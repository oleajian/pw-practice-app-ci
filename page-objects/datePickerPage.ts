import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class DatePickerPage extends HelperBase{

    constructor(page: Page){
    super(page)}

    async selectDateFromDatePicker(numberOfDaysFromToday:number){
        const calendarInputField = this.page.getByPlaceholder('Form Picker')
        await calendarInputField.click()
        const dateToAssert= await this.selectDateInTheCalendar(numberOfDaysFromToday)
        await expect(calendarInputField).toHaveValue(dateToAssert)
    }

    async selectDateFromDatePickerWithRange(numberOfDaysStart:number,numberOfDaysEnd:number){
        const calendarInputField = this.page.getByPlaceholder('Range Picker')
        await calendarInputField.click()   
        // await this.selectDateInTheCalendar(numberOfDaysStart)
        // await this.selectDateInTheCalendar(numberOfDaysEnd)
        const dateToAssert1= await this.selectDateInTheCalendar(numberOfDaysStart)
        const dateToAssert2= await this.selectDateInTheCalendar(numberOfDaysEnd)
        await expect(calendarInputField).toHaveValue(`${dateToAssert1} - ${dateToAssert2}`)
    }
    

    private async selectDateInTheCalendar(numberOfDaysFromToday:number){
        //1.formatam si extragem expected date

        //luam data de azi
        let date = new Date()
        //adunamm numarul de zile dorit
        date.setDate(date.getDate() + numberOfDaysFromToday)
        //din data obtinuta scoatem data si o convertim in string
        const expectedDate = date.getDate().toString()
        //din data obtinuta scoatem luna si o convertim in String scurt
        const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
        //pregatim pentru assertion deoarece in html in cod se ia varianta lunga dar se afiseaza cea scurta
        const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
        //scoatem anul
        const expectedYear=date.getFullYear()
        //formam data care vrem sa o comparam din data, luna si anul formatat mai sus
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
        
        //2.selectam data in calendar
        //luan valoarea din calendar
        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        //si comparam cu expected in format lung
        const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`
        //apasam click pe dreapta pina ajungem la luna dorita
        while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
            }
        //
        //await this.page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate,{exact: true}).click()
        await this.page.locator('.day-cell').getByText(expectedDate,{exact: true}).click()
        return dateToAssert
    }

}