// StocksService.js
import { Injectable } from '@angular/core';
import { Http, Response, Headers, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class StocksService {
  
  /**
   * Creates a new StocksService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
  */  
  constructor(private http: Http, private jsonp:Jsonp) {}
 
  getStockDetail(code:string): Observable<Object[]> {
    //let url = "http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=AAPL&callback=JSONP_CALLBACK";
    
    let url = "http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=" + code + "&callback=JSONP_CALLBACK";
    
    return this.jsonp.request(url, { method: 'Get' })
        .map((res: Response) => res.json())
        .catch(this.handleError);      
  } 
  
  getStockHistoric(code:string): Observable<Object[]> {
    let apiString = "http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/jsonp?parameters=%7B%22Normalized%22%3Afalse%2C%22NumberOfDays%22%3A365%2C%22DataPeriod%22%3A%22Day%22%2C%22Elements%22%3A%5B%7B%22Symbol%22%3A%22AAPL%22%2C%22Type%22%3A%22price%22%2C%22Params%22%3A%5B%22c%22%5D%7D%5D%7D&callback=JSONP_CALLBACK";
    //let apiString = "http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters=%7B%22Normalized%22%3Afalse%2C%22NumberOfDays%22%3A365%2C%22DataPeriod%22%3A%22Day%22%2C%22Elements%22%3A%5B%7B%22Symbol%22%3A%22" + code + "%22%2C%22Type%22%3A%22price%22%2C%22Params%22%3A%5B%22c%22%5D%7D%5D%7D";
    
    console.log("Getting stock detail from api with code of: ", code);      

    return this.jsonp.request(apiString, { method: 'Get' })
        .map((res: Response) => res.json())
        .catch(this.handleError);      
  } 
  
  getStocks(): Observable<Object[]> {
    return this.http.get('/api/stocks/')
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }   

  saveStock(data:Object): Observable<string[]> {
    let headers = new Headers({
      'Content-Type': 'application/json'});

    return this.http.post('/api/stocks/', JSON.stringify(data), {
      headers: headers
    }).map((res) => res.json().data);
  } 

  deleteStock(id:string): Observable<string[]> {
    return this.http.delete('/api/stocks/' + id)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }  

  /**
    * Handle HTTP error
  */
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }  
}