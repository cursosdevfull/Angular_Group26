import { Routes } from "@angular/router";

export const dashboardRoutes: Routes = [
    {
        path: "",
        loadComponent: () => import("./ui/dashboard/dashboard").then(m => m.Dashboard)
    }
]