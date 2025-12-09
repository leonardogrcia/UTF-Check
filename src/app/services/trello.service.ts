import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrelloBackendService {

  private readonly API_URL = 'https://api.trello.com/1';
  private readonly key = (import.meta as any)?.env?.NG_APP_TRELLO_KEY || '';
  private readonly token = (import.meta as any)?.env?.NG_APP_TRELLO_TOKEN || '';

  constructor(private http: HttpClient) { }



}