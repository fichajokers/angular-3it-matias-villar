import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GetDolarResponseModel } from '../models/Dolar.model';
import { GetEuroResponseModel } from '../models/Euro.model';
import { GetIpcResponseModel } from '../models/Ipc.model';
import { GetUfResponseModel } from '../models/Uf.model';
import { GetUtmResponseModel } from '../models/Utm.model';
import { HandleErrorService } from './handle-error.service';

@Injectable({
  providedIn: 'root'
})
export class CmfService {
  	private apiUrl : string = environment.api_url
  	private apiKey : string = environment.api_key
  
  	constructor(private http 				: HttpClient,
              	private handleErrorService 	: HandleErrorService) { }

	/**
	 * @author Matías villar
	 * @date 22-06-2022
	 * @Description Get Dolar historial between two dates
	 * @param i_year    : initial year
	 * @param i_month   : initial month
	 * @param i_date    : initial date
	 * @param f_year    : final year
	 * @param f_month   : final month
	 * @param f_date    : final Date
	 * @returns GetDolarResponseModel
	 */
	 getDolarHistorical(
		i_year  : number,
		i_month : number,
		i_date  : number,
		f_year  : number,
		f_month : number,
		f_date  : number
	) : Observable<GetDolarResponseModel>{
		return this.http.get<GetDolarResponseModel>(`${this.apiUrl}/dolar/periodo/${i_year}/${i_month}/dias_i/${i_date}/${f_year}/${f_month}/dias_f/${f_date}/?apikey=${this.apiKey}&formato=json`).pipe(	
			catchError(this.handleErrorService.handleError)
		)
	}

	/**
	 * @author Matías villar
	 * @date 22-06-2022
	 * @Description Get Euro historical between two dates
   	 * @param i_year    : initial year
   	 * @param i_month   : initial month
   	 * @param i_date    : initial date
   	 * @param f_year    : final year
   	 * @param f_month   : final month
   	 * @param f_date    : final Date
	 * @returns GetEuroResponseModel
	 */
	 getEuroHistorical(
		i_year  : number,
		i_month : number,
		i_date  : number,
		f_year  : number,
		f_month : number,
		f_date  : number
	) : Observable<GetEuroResponseModel>{		
		return this.http.get<GetEuroResponseModel>(`${this.apiUrl}/euro/periodo/${i_year}/${i_month}/dias_i/${i_date}/${f_year}/${f_month}/dias_f/${f_date}/?apikey=${this.apiKey}&formato=json`).pipe(	
			catchError(this.handleErrorService.handleError)
		)
	}

	/**
	 * @author Matías villar
	 * @date 22-06-2022
	 * @Description Get IPC historical between two dates
     * @param i_year  : initial year
	 * @returns GetIpcResponseModel
	 */
	 getIpcHistorical(i_year  : number) : Observable<GetIpcResponseModel>{		
		return this.http.get<GetIpcResponseModel>(`${this.apiUrl}/ipc/${i_year}?apikey=${this.apiKey}&formato=json`).pipe(	
			catchError(this.handleErrorService.handleError)
		)
	}


	/**
	 * @author Matías villar
	 * @date 22-06-2022
	 * @Description Get UF historical between two dates
     * @param i_year    : initial year
     * @param i_month   : initial month
     * @param i_date    : initial date
     * @param f_year    : final year
     * @param f_month   : final month
     * @param f_date    : final Date
	 * @returns GetUfResponseModel
	 */
	 getUfHistorical(
		i_year  : number,
		i_month : number,
		i_date  : number,
		f_year  : number,
		f_month : number,
		f_date  : number
	) : Observable<GetUfResponseModel>{		
		return this.http.get<GetUfResponseModel>(`${this.apiUrl}/uf/periodo/${i_year}/${i_month}/dias_i/${i_date}/${f_year}/${f_month}/dias_f/${f_date}/?apikey=${this.apiKey}&formato=json`).pipe(	
			catchError(this.handleErrorService.handleError)
		)
	}

	/**
	 * @author Matías villar
	 * @date 22-06-2022
	 * @Description Get UTM historical between two dates
     * @param i_year  : initial year
	 * @returns GetUtmResponseModel
	 */
	 getUtmHistorical(i_year  : number) : Observable<GetUtmResponseModel>{		
		return this.http.get<GetUtmResponseModel>(`${this.apiUrl}/utm/${i_year}?apikey=${this.apiKey}&formato=json`).pipe(	
			catchError(this.handleErrorService.handleError)
		)
	}
}
