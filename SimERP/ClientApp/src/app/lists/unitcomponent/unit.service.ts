import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ResponeResult } from 'src/app/common/commomodel/ResponeResult';
import { AuthenParams } from 'src/app/common/commomodel/AuthenParams';
import { TaxSearchParams } from '../taxcomponent/models/TaxSearchParams';
import { DelTaxParams } from '../taxcomponent/models/DelTaxParams';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  
  authenParams = new AuthenParams();
  taxSearchParams = new TaxSearchParams();
  delUnitParams = new DelTaxParams();
  
  constructor(private httpClient: HttpClient) { }

  getData(searchString?: string, startRow?: number, maxRow?: number) {
    
    this.authenParams.Sign = 'tai.ngo';
    this.taxSearchParams.authenParams = this.authenParams;
    this.taxSearchParams.maxRow = maxRow;
    this.taxSearchParams.startRow = startRow;
    this.taxSearchParams.searchString = searchString;

    const jsonString = JSON.stringify(this.taxSearchParams);
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpClient.post<ResponeResult>('https://localhost:44335/api/list/unit', jsonString, { headers });
  }

  DeleteUnit(UnitCode: number) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    this.delUnitParams.authenParams = this.authenParams;
    this.delUnitParams.id = UnitCode;
    const jsonString = JSON.stringify(this.delUnitParams);
    console.log(jsonString);
    return this.httpClient.post<ResponeResult>('https://localhost:44335/api/list/DeleteUnit', jsonString, { headers });
  }
}
