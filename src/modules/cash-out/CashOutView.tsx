import api from "@/api";
import { PurchasePayload } from "@/api/cash-out/types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { RootState } from "@/store";
import { clearCart } from "@/store/features/cartSlice";
import { ArrowBigLeftIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const CashOutView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const grandTotal = cartItems?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const { mutate: purchaseProduct } =
    api.cash_out.purchaseProductMutation.useMutation({
      onSuccess: () => {
        dispatch(clearCart());
        navigate("/cart");
        toast({
          title: "Success",
          description: "Cash Out Success",
        });
      },
      onError: (error) => {
        console.error("Error:", error);
        toast({
          title: "Error",
          description: "Cash Out Failed",
          variant: "destructive",
        });
      },
    });

  const onSubmit = () => {
    const payload: PurchasePayload = cartItems.map((item) => ({
      product_Id: item.id,
      sale_Quantity: item.quantity,
    }));
    purchaseProduct(payload);
  };

  return (
    <div>
      <NavLink to="/cart">
        <Button className="my-3" variant="outline">
          <ArrowBigLeftIcon /> Go Back To Cart
        </Button>
      </NavLink>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead>Total Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartItems.map((item) => (
            <TableRow>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.price * item.quantity}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell colSpan={3} className="text-center font-bold">
              Grand Total Amount
            </TableCell>
            <TableCell className="font-bold">{grandTotal}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={3} className="text-center">
              <Button onClick={() => onSubmit()}>Cash Out</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
