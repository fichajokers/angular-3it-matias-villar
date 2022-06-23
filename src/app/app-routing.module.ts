import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyDetailComponent } from './currency-detail/currency-detail.component';
import { CurrencyHistoricalComponent } from './currency-historical/currency-historical.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'currency-detail',      component: CurrencyDetailComponent },
  { path: 'currency-historical',  component: CurrencyHistoricalComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
