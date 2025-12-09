import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, map, of, switchMap } from 'rxjs';

import { CardData } from '../pages/dashbord-page/card-data.interface';

@Injectable({
  providedIn: 'root'
})
export class TrelloBackendService {

  private readonly API_URL = 'https://api.trello.com/1';
  private readonly key = (import.meta as any)?.env?.NG_APP_TRELLO_KEY || '';
  private readonly token = (import.meta as any)?.env?.NG_APP_TRELLO_TOKEN || '';

  constructor(private http: HttpClient) { }

  private withAuth(params: Record<string, string> = {}) {
    return new HttpParams({ fromObject: { key: this.key, token: this.token, ...params } });
  }

  getMyBoards() {
    return this.http.get(`${this.API_URL}/members/me/boards`, { params: this.withAuth() });
  }

  getCardsFromList(listId: string) {
    return this.http.get<any[]>(`${this.API_URL}/lists/${listId}/cards`, { params: this.withAuth() });
  }

  getChecklists(cardId: string) {
    return this.http.get<any[]>(`${this.API_URL}/cards/${cardId}/checklists`, { params: this.withAuth() });
  }

  createChecklist(cardId: string, name: string) {
    return this.http.post(`${this.API_URL}/checklists`, null, { params: this.withAuth({ idCard: cardId, name }) });
  }

  addItemToChecklist(checklistId: string, name: string, checked = false) {
    return this.http.post(`${this.API_URL}/checklists/${checklistId}/checkItems`, null, {
      params: this.withAuth({ name, checked: checked ? 'true' : 'false' }),
    });
  }

  addComment(cardId: string, text: string) {
    return this.http.post(`${this.API_URL}/cards/${cardId}/actions/comments`, null, { params: this.withAuth({ text }) });
  }

  createBoard(name: string) {
    return this.http.post<{ id: string }>(`${this.API_URL}/boards`, null, {
      params: this.withAuth({ name }),
    });
  }

  createList(boardId: string, name: string) {
    return this.http.post<{ id: string }>(`${this.API_URL}/lists`, null, {
      params: this.withAuth({ name, idBoard: boardId }),
    });
  }

  createCard(listId: string, name: string, desc?: string) {
    return this.http.post<{ id: string; name: string }>(`${this.API_URL}/cards`, null, {
      params: this.withAuth({ idList: listId, name, desc: desc ?? '' }),
    });
  }

  getAttachments(cardId: string) {
    return this.http.get<any[]>(`${this.API_URL}/cards/${cardId}/attachments`, {
      params: this.withAuth(),
    });
  }

  uploadAttachment(cardId: string, file: File, name?: string) {
    const form = new FormData();
    form.append('file', file, file.name);
    form.append('name', name ?? file.name);

    return this.http.post(`${this.API_URL}/cards/${cardId}/attachments`, form, {
      params: this.withAuth(),
    });
  }

  /**
   * Cria cards e, para cada card, cria um checklist com itens definidos.
   * Se boardId/listId forem nulos/undefined, cria um board/lista automaticamente.
   */
  syncCardsWithChecklists(
    cards: CardData[],
    checklistsByCard: Record<string, string[]>,
    options?: { boardId?: string | null; listId?: string | null; boardName?: string; listName?: string; }
  ) {
    const boardName = options?.boardName ?? 'UTF-Check';
    const listName = options?.listName ?? 'UTF-Check Checklist';

    return this.ensureList(options?.boardId, options?.listId, boardName, listName).pipe(
      switchMap((resolvedListId) => {
        return forkJoin(
          cards.map((card) =>
            this.createCard(resolvedListId, card.title, `id: ${card.id} | status: ${card.status}`)
          )
        ).pipe(
          switchMap((createdCards) => {
            const checklistCalls = createdCards.map((created, idx) => {
              const sourceCard = cards[idx];
              const items = checklistsByCard[sourceCard.id] ?? [];
              if (!items.length) {
                return of(null);
              }
              return this.createChecklist(created.id, sourceCard.title).pipe(
                switchMap((checklist: any) =>
                  forkJoin(items.map((item) => this.addItemToChecklist(checklist.id, item)))
                )
              );
            });
            const checklistFlow = checklistCalls.length ? forkJoin(checklistCalls) : of([]);
            return checklistFlow.pipe(
              map((checklistResults) => ({
                listId: resolvedListId,
                createdCards,
                checklistResults
              }))
            );
          })
        );
      })
    );
  }

  /**
   * Recupera cards de uma lista com seus checklists e itens.
   */
  getCardsWithChecklists(listId: string) {
    return this.getCardsFromList(listId).pipe(
      switchMap((cards: any[]) =>
        cards.length
          ? forkJoin(
              cards.map((card) =>
                this.getChecklists(card.id).pipe(
                  map((checklists: any[]) => ({
                    id: card.id,
                    name: card.name,
                    checklists: checklists.map((cl) => ({
                      id: cl.id,
                      name: cl.name,
                      items: (cl.checkItems || []).map((item: any) => ({
                        id: item.id,
                        name: item.name,
                        state: item.state
                      }))
                    }))
                  }))
                )
              )
            )
          : of([])
      )
    );
  }

  private ensureList(boardId?: string | null, listId?: string | null, boardName?: string, listName?: string) {
    if (listId) {
      return of(listId);
    }

    const board$ = boardId
      ? of(boardId)
      : this.createBoard(boardName ?? 'UTF-Check').pipe(map((b) => b.id));

    return board$.pipe(
      switchMap((resolvedBoardId) =>
        this.createList(resolvedBoardId, listName ?? 'UTF-Check Checklist').pipe(map((list) => list.id))
      )
    );
  }
}
