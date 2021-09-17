import { People } from '@swapi/api-interfaces';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { environment } from '@env/environments';
@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private model = 'people';
  constructor(private http: HttpClient) {}

  all() {
    return this.http.get<People>(this.getApi());
  }

  find(id: string) {
    return this.http.get<People>(this.getApiById(id));
  }

  delete(id: string) {
    return this.http.delete<string>(this.getApiById(id));
  }

  private getApi() {
    return `${environment.apiUrl}${this.model}`;
  }

  private getApiById(id: string) {
    return `${this.getApi()}/${id}`;
  }
}
