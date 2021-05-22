import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  getData()
  {
    let url = "https://localhost:44325/api/TestData";
    return this.http.get(url);
  }
}
