import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrelloBackendService {

  private readonly API_URL = 'https://api.trello.com/1'; 

  constructor(private http: HttpClient) { }



}