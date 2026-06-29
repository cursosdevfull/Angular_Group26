import { Observable } from 'rxjs';
import { Auth } from '../auth';
import { RESPONSE, TOKENS } from '@backoffice/core/types';
import { Signal, WritableSignal } from '@angular/core';

export type PORT_AUTH_APPLICATION = {
  credentials: WritableSignal<Auth | null>;
  responseLogin: Signal<TOKENS | RESPONSE | null>;
  //login(credentials: Auth): Observable< { access_token: string, refresh_token: string } | RESPONSE>;
};
