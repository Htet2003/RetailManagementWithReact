import * as stock from "./stock"
import * as cash_out from "./cash-out"
import * as dashboard from "./dashboard"

class API {
    stock: typeof stock;
    cash_out: typeof cash_out;
    dashboard: typeof dashboard;

    constructor() {
        this.stock = stock;
        this.cash_out = cash_out;
        this.dashboard = dashboard;
    }
}

const api = new API();

export default api;