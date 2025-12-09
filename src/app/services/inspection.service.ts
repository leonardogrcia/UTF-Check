
import { Injectable } from '@angular/core';

export interface InspectionState {
  options: boolean[];
  updatedAt: string; 
}

@Injectable({ providedIn: 'root' })
export class InspectionService {
  private prefix = 'ru_inspection_';

  save(categoryKey: string, state: InspectionState) {
    localStorage.setItem(this.prefix + categoryKey, JSON.stringify(state));
  }

  load(categoryKey: string): InspectionState | null {
    const raw = localStorage.getItem(this.prefix + categoryKey);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as InspectionState;
    } catch {
      return null;
    }
  }

  clear(categoryKey: string) {
    localStorage.removeItem(this.prefix + categoryKey);
  }
}
