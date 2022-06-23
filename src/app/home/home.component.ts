import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
export class HomeComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {}

  /**
	 * @author Matías villar
	 * @date 22-06-2022
	 * @description go to detail of the specific currency
	 * @param id:
   * 1 : dolar
   * 2 : Euro
   * 3 : IPC
   * 4 : UF
   * 5 : UTM
	 * @returns 
	 */
  goToDetail(id : number){
    this.router.navigate(['/currency-detail',{ id: id }])
  }

  /**
	 * @author Matías villar
	 * @date 22-06-2022
	 * @description go to Historical detail of the specific currency
	 * @param id :
   * 1 : dolar
   * 2 : Euro
   * 3 : IPC
   * 4 : UF
   * 5 : UTM
	 * @returns 
	 */
  goToHistorical(id : number){
    this.router.navigate(['/currency-historical',{ id: id }])
  }
}
