import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyModel } from '../models/Currency.model';
import { CmfService } from '../services/cmf-service.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { currencies } from '../constant/currencies';

@Component({
  selector: 'app-currency-historical',
  templateUrl: './currency-historical.component.html',
  styleUrls: ['./currency-historical.component.scss'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ height: 0, opacity: 0 }),
            animate('0.7s ease-out', 
                    style({ height: 300, opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ height: 300, opacity: 1 }),
            animate('0.3s ease-in', 
                    style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class CurrencyHistoricalComponent implements OnInit {

  currencyName  : string = ''
  currencyId    : number = 0
  finalDate!    : Date
  initialDate!  : Date
  todayDate     : Date = new Date()
  currencies!   : Array<CurrencyModel>
  isLoading     : boolean = true

  constructor(
    private cmfService      : CmfService,
    private activatedRoute  : ActivatedRoute) {  
  }

  ngOnInit(): void {
    let id : any = this.activatedRoute.snapshot.paramMap.get('id')
    /** get currency id from parameters
     * 1 : dolar
     * 2 : Euro
     * 3 : IPC
     * 4 : UF
     * 5 : UTM
     */
    this.currencyId   = parseInt(id)
    this.currencyName = currencies.find( item => item.id == this.currencyId ).name
    
    //Get the currency data selected.
    switch (this.currencyId) {
      case 1:
        this.getLast30days()
        this.getDolar(
          this.initialDate.getFullYear(),
          this.initialDate.getMonth()+1,
          this.initialDate.getDate(),
          this.finalDate.getFullYear(),
          this.finalDate.getMonth()+1,
          this.finalDate.getDate()
        )
        break;
      case 2:
        this.getLast30days()
        this.getEuro(
          this.initialDate.getFullYear(),
          this.initialDate.getMonth()+1,
          this.initialDate.getDate(),
          this.finalDate.getFullYear(),
          this.finalDate.getMonth()+1,
          this.finalDate.getDate()
        )
        break;
      case 3:
        this.getIpc( this.todayDate.getFullYear() )
        break;
      case 4:
        this.getLast30days()
        this.getUf(
          this.initialDate.getFullYear(),
          this.initialDate.getMonth()+1,
          this.initialDate.getDate(),
          this.finalDate.getFullYear(),
          this.finalDate.getMonth()+1,
          this.finalDate.getDate()
        )
        break;
      case 5:
        this.getUtm( this.todayDate.getFullYear() )
        break;
      default:
        break;
    } 
  }

  /**
   * @author Matías Villar
   * @Date 22/02/2022
   * @Description Get Dolar historial between two dates
   * @param i_year    : initial year
   * @param i_month   : initial month
   * @param i_date    : initial date
   * @param f_year    : final year
   * @param f_month   : final month
   * @param f_date    : final Date
   */
  getDolar(
    i_year  : number,
    i_month : number,
    i_date  : number,
    f_year  : number,
    f_month : number,
    f_date  : number
  ){
    this.cmfService.getDolarHistorical(i_year,i_month,i_date,f_year,f_month,f_date).subscribe( data =>{
      this.currencies = data.Dolares.reverse()
      this.isLoading = false
    })
  }

  /**
   * @author Matías Villar
   * @Date 22/02/2022
   * @Description Get Euro historical between two dates
   * @param i_year    : initial year
   * @param i_month   : initial month
   * @param i_date    : initial date
   * @param f_year    : final year
   * @param f_month   : final month
   * @param f_date    : final Date
   */
  getEuro(
    i_year  : number,
    i_month : number,
    i_date  : number,
    f_year  : number,
    f_month : number,
    f_date  : number
  ){
    this.cmfService.getEuroHistorical(i_year,i_month,i_date,f_year ,f_month,f_date).subscribe( data =>{
      this.currencies = data.Euros.reverse()
      this.isLoading = false
    })
  }

  /**
   * @author Matías Villar
   * @Date 22/02/2022
   * @Description Get IPC historical between two dates
   * @param i_year  : initial year
   */
  getIpc(i_year  : number){
    this.cmfService.getIpcHistorical(i_year).subscribe( data =>{
      this.currencies = data.IPCs.reverse()
      this.isLoading = false
    })
  }

  /**
   * @author Matías Villar
   * @Date 22/02/2022
   * @Description Get UF historical between two dates
   * @param i_year    : initial year
   * @param i_month   : initial month
   * @param i_date    : initial date
   * @param f_year    : final year
   * @param f_month   : final month
   * @param f_date    : final Date
   */
  getUf(
    i_year  : number,
    i_month : number,
    i_date  : number,
    f_year  : number,
    f_month : number,
    f_date  : number
  ){
    this.cmfService.getUfHistorical(i_year,i_month,i_date,f_year ,f_month,f_date).subscribe( data =>{
      this.currencies = data.UFs.reverse()
      this.isLoading = false
    })
  }

  /**
   * @author Matías Villar
   * @Date 22/02/2022
   * @Description Get UTM historical between two dates
   * @param i_year  : initial year
   */
  getUtm(i_year  : number){
    this.cmfService.getUtmHistorical(i_year).subscribe( data =>{
      this.currencies = data.UTMs.reverse()
      this.isLoading = false
    })
  }

  /**
   * @author Matías Villar
   * @Date 22/02/2022
   * @Description Get date of last 30 days
   */
  getLast30days(){
    this.finalDate  = new Date();
    this.initialDate   = new Date(new Date().setDate(this.finalDate.getDate() - 30));
  }
}
