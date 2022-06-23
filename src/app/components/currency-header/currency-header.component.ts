import { Component, Input, OnInit } from '@angular/core';
import { currencies } from 'src/app/constant/currencies';

@Component({
  selector: 'app-currency-header',
  templateUrl: './currency-header.component.html',
  styleUrls: ['./currency-header.component.scss']
})
export class CurrencyHeaderComponent implements OnInit {
  @Input() currencyId : number = 0
  currencyName        : string = ''

  constructor() {}

  ngOnInit(): void {
    this.currencyName = currencies.find( item => item.id == this.currencyId ).name    
  }

}
