"use client";

import * as z from "zod";
import axios, { AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

// hooks
import { useStoreModal } from "@/hooks/use-store-modal";

// components
import { Modal } from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// store modal form zod schema
const formSchema = z.object({
  name: z.string().min(1, "Required"),
});

// store modal
export const StoreModal = () => {
  // use store modal
  const storeModal = useStoreModal();

  // states
  const [loading, setLoading] = useState(false);

  // store modal form data
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // on form submit
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // show loading
      setLoading(true);

      // get response from api
      const response: AxiosResponse = await axios.post("/api/stores", values);

      // update location and redirect
      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      // show error message
      toast.error("Something went wrong.");
      throw new Error("Something went wrong.");
    } finally {
      // hide loader
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          {/* create store form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* store name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="E-Commerce"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* cancel */}
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  variant="outline"
                  disabled={loading}
                  onClick={storeModal.onClose}
                >
                  Cancel
                </Button>

                {/* continue */}
                <Button type="submit" disabled={loading}>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
