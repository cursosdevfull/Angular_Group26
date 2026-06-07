import { InjectionToken, Provider } from "@angular/core";
import { AuthApplication } from "./application/auth";
import { AuthAdapter } from "./infrastructure";

export const TOKEN_AUTH_APPLICATION = new InjectionToken("TOKEN_AUTH_APPLICATION");
export const TOKEN_AUTH_ADAPTER = new InjectionToken("TOKEN_AUTH_ADAPTER");

export const provideAuth = (): Provider[] => [
    {
        provide: TOKEN_AUTH_APPLICATION,
        useClass: AuthApplication
    },
    {
        provide: TOKEN_AUTH_ADAPTER,
        useClass: AuthAdapter
    }
]