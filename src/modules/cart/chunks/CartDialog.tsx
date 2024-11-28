import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { CircleXIcon, MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  addToCart,
  clearCart,
  reduceQuantity,
  removeFromCart,
} from "@/store/features/cartSlice";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavLink } from "react-router-dom";

interface CartDialogProps {
  dialogOpen: boolean; // Controls whether the dialog is open
  onClose: () => void; // Function to handle closing the dialog
}

export const CartDialog: React.FC<CartDialogProps> = ({
  dialogOpen,
  onClose,
}) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <Dialog open={dialogOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[680px] py-10">
        <Button
          onClick={() => {
            dispatch(clearCart());
          }}
          variant="destructive"
        >
          <Trash2Icon />
        </Button>
        <ScrollArea className="h-[300px] w-[630px] rounded-md border p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        dispatch(reduceQuantity(item.id));
                      }}
                      disabled={item.quantity == 1}
                      variant="outline"
                    >
                      <MinusIcon />
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button
                      onClick={() => {
                        dispatch(addToCart(item));
                      }}
                      variant="outline"
                      disabled={item.quantity >= item.stock}
                    >
                      <PlusIcon />
                    </Button>
                  </TableCell>
                  <TableCell>{item.price * item.quantity}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        dispatch(removeFromCart(item.id));
                      }}
                      variant="destructive"
                    >
                      <CircleXIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>

        <div className="mt-4 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <NavLink to="/cash-out">
            <Button onClick={onClose}>Cash Out</Button>
          </NavLink>
        </div>
      </DialogContent>
    </Dialog>
  );
};
