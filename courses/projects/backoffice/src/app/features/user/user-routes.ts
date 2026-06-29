import { Routes } from "@angular/router";

export const userRoutes: Routes = [
    {
        path: "",
        loadComponent: () => import("./ui/user-list/user-list").then(m => m.UserList)
    }
]