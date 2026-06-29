import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public setItem(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  public getItem(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  public clear(): void {
    sessionStorage.clear();
  }
}
