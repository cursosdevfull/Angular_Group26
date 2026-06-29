import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _loading: WritableSignal<boolean> = signal(false);

  public loading = this._loading.asReadonly();

  public setLoading(loading: boolean): void {
    this._loading.set(loading);
  }
}
