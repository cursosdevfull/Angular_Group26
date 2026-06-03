import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class GatewayPayment {
    NAME_PROVIDER = "VISANET"

    constructor() {
        console.log("GatewayPayment created");
    }
}