import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface StockDialogProps {
  dialogOpen: boolean; // Controls whether the dialog is open
  isEdit: boolean;
  onClose: () => void; // Function to handle closing the dialog
}

const FormSchema = z.object({
  productName: z
    .string()
    .min(2, "Product name must be at least 2 characters")
    .max(50, "Product name must be no more than 50 characters"),
  stock: z
    .number()
    .min(1, "Stock must be greater than 0")
    .int("Stock must be a whole number"),
  price: z.number().min(0.01, "Price must be a positive decimal"),
  profitPerItem: z.number().min(0.01, "Profit must be a positive decimal"),
});

const StockDialog: React.FC<StockDialogProps> = ({
  dialogOpen,
  onClose,
  isEdit,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      productName: "",
      stock: 0,
      price: 0,
      profitPerItem: 0,
    },
    shouldUnregister: true,
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {}

  return (
    <Dialog open={dialogOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Product Name"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Stock"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Price"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profitPerItem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profit per item</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Profit per item"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isEdit ? "Edit" : "Add"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default StockDialog;
