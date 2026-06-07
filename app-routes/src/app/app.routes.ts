import { Routes } from '@angular/router';
import { Home } from './home/home';
import { authenticationGuard } from './guards/authentication';
import { authorizationGuard } from './guards/authorization-guard';
import { viewGuard } from './guards/view-guard';
import { roleGuard } from './guards/role-guard';
import { unsaveGuard } from './guards/unsave-guard';

export const routes: Routes = [
    {
        path: "",
        component: Home
    },
    {
        path: "information",
        //component: Information
        canActivate: [authenticationGuard, authorizationGuard],
        loadComponent: () => import("./information/information").then(c => c.Information)
    },
    {
        path: "payments",
        //component: Payments
        canMatch: [roleGuard],
        canDeactivate: [unsaveGuard],
        data: { rolesAllowed: ["staff"] },
        loadComponent: () => import("./payments/payments").then(c => c.Payments)
    },
    {
        path: "payments",
        canMatch: [roleGuard],
        data: { rolesAllowed: ["admin", "accountant"] },
        loadComponent: () => import("./payments-secure/payments-secure").then(c => c.PaymentsSecure)
    },
    {
        path: "reports",
        //component: Reports
        loadComponent: () => import("./reports/reports").then(c => c.Reports),
        //children: []
        canActivateChild: [viewGuard],
        loadChildren: () => import("./reports/reports-routes").then(c => c.routes)
    },
    {
        path: "**",
        redirectTo: ""
        //component: Home
    }
];
