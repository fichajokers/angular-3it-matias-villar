import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyModel } from '../models/Currency.model';
import { CmfService } from '../services/cmf-service.service';
import { currencies } from '../constant/currencies';
import { unidadMedida } from '../constant/unidadDeMedida';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-currency-detail',
  templateUrl: './currency-detail.component.html',
  styleUrls: ['./currency-detail.component.scss'],
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
export class CurrencyDetailComponent implements OnInit {
  //Chart initialization
  multi = [
    {
      "name": "",
      "series": [
        {
          "name": "",
          "value": 0
        }
      ]
    },
  ];

  //Chart options
  view            : [number,number] = [window.innerWidth/1.5, 300];
  legend          : boolean = true;
  showLabels      : boolean = true;
  animations      : boolean = true;
  xAxis           : boolean = true;
  yAxis           : boolean = true;
  showYAxisLabel  : boolean = true;
  showXAxisLabel  : boolean = true;
  xAxisLabel      : string = 'Fecha';
  yAxisLabel      : string = 'Valor';
  timeline        : boolean = true;  

  currencyName    : string = ''
  unidadMedida    : string = ''
  currencyId      : number = 0
  currencies!     : Array<CurrencyModel>
  finalDate!      : Date
  initialDate!    : Date
  todayDate       : Date = new Date()
  isLoading       : boolean = true

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
    this.unidadMedida = unidadMedida.find( item => item.id == this.currencyId ).unidad

    //Get the currency data selected.
    switch (this.currencyId) {
      case 1:
        this.getLast10days()
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
        this.getLast10days()
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
        this.getLast10days()
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
      this.currencies = data.Dolares
      this.setGraphData()
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
      this.currencies = data.Euros
      this.setGraphData()
      this.isLoading = false
    })
  }

  /**
   * @author Matías Villar
   * @Date 22/02/2022
   * @Description Get IPC historical between two dates
   * @param i_year  : initial year
   */
  getIpc(i_year : number){
    this.cmfService.getIpcHistorical(i_year).subscribe( data =>{
      this.currencies = data.IPCs
      this.setGraphData()
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
      this.currencies = data.UFs
      this.setGraphData()
      this.isLoading = false
    })
  }

  /**
   * @author Matías Villar
   * @Date 22/02/2022
   * @Description Get UTM historical between two dates
   * @param i_year  : initial year
   */
  getUtm(i_year : number){
    this.cmfService.getUtmHistorical(i_year).subscribe( data =>{
      this.currencies = data.UTMs
      this.setGraphData()
      this.isLoading = false
    })
  }

  /**
   * @author Matías Villar
   * @Date 22/02/2022
   * @Description Get date of last ten days
   */
  getLast10days(){
    this.finalDate    = new Date();
    this.initialDate  = new Date(new Date().setDate(this.finalDate.getDate() - 10));
  }

  /**
   * @author Matías Villar
   * @Date 22/02/2022
   * @Description Set the graph data from selected currency.
   */
  setGraphData(){
    let series = this.currencies.map(currency =>{
      return {
        name  : currency.Fecha.toString(),
        value : parseFloat(currency.Valor.toString().replace(',', '.'))
      }
    })

    this.multi = [
      {
        "name"  : this.currencyName,
        "series" : series
      }
    ]
  }
}
