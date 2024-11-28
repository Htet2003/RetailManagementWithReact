import axios from "axios";
import type { PurchasePayload } from "./types";

const baseUrl = "/Sale";

const purchaseProduct = async (payload: PurchasePayload) => {
  const response = await axios.post(`${baseUrl}/PurchaseProduct`, payload);

  return response.data;
};

export default { purchaseProduct };
