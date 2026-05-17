import { Component } from "@angular/core";
import { List } from "./list/list";

@Component({
    selector: "app-home",
    templateUrl: "./home.html",
    styleUrl: "./home.scss",
    imports: [List]
})
export class Home {
    public title = "Cursos Dev"
}