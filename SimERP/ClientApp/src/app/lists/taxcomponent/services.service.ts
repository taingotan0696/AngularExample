import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenParams } from 'src/app/common/commomodel/AuthenParams';
import { ResponeResult } from 'src/app/common/commomodel/ResponeResult';
import { TaxSearchParams } from './models/TaxSearchParams';
import { DelTaxParams } from './models/DelTaxParams';
import { Tax } from './models/Tax';
import { AddTaxParams } from './models/AddTaxParams';

@Injectable({
  providedIn: 'root'
})
export class TaxService {
  authenParams = new AuthenParams();
  taxSearchParams = new TaxSearchParams();
  delTaxParams = new DelTaxParams();
  addTaxParams = new AddTaxParams();


  constructor(private httpClient: HttpClient) { }

  getData(searchString?: string, startRow?: number, maxRow?: number) {
    this.authenParams.Sign = 'tam.ngo';
    this.taxSearchParams.authenParams = this.authenParams;
    this.taxSearchParams.maxRow = maxRow;
    this.taxSearchParams.startRow = startRow;
    this.taxSearchParams.searchString = searchString;

    const jsonString = JSON.stringify(this.taxSearchParams);
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpClient.post<ResponeResult>('https://localhost:44335/api/list/tax', jsonString, { headers });
  }

  DeleteTax(tax: Tax) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    this.delTaxParams.authenParams = this.authenParams;
    this.delTaxParams.id = tax.TaxID;
    const jsonString = JSON.stringify(this.delTaxParams);
    return this.httpClient.post<ResponeResult>('https://localhost:44335/api/list/deletetax', jsonString, { headers });
  }

  SaveTax(tax: Tax, isNew: boolean) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    this.addTaxParams.authenParams = this.authenParams;
    this.addTaxParams.tax = tax;
    this.addTaxParams.isNew = isNew;
    const jsonString = JSON.stringify(this.addTaxParams);
    return this.httpClient.post<ResponeResult>('https://localhost:44335/api/list/savetax', jsonString, { headers });
  }
}
