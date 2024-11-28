import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { PurchasePayload } from "./types";
import purchaseServices from "./services";

export const purchaseProductMutation = {
  useMutation: (opt?: UseMutationOptions<any, Error, PurchasePayload, any>) =>
    useMutation({
      mutationKey: ["purchaseProduct"],
      mutationFn: (payload: PurchasePayload) =>
        purchaseServices.purchaseProduct(payload),
      ...opt,
    }),
};
