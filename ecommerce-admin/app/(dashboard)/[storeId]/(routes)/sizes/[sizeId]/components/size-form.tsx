"use client";

import * as z from "zod";
import { useState } from "react";
import axios from "axios";
import { Size } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

// icon
import { Trash } from "lucide-react";

// components
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";

// size form props
type SizeFormProps = {
  initialData: Size | null;
};

// size form zod schema
const formSchema = z.object({
  name: z.string().min(1, "Required"),
  value: z.string().min(1, "Required"),
});

// size form values
type SizeFormValues = z.infer<typeof formSchema>;

// size form
const SizeForm: React.FC<SizeFormProps> = ({ initialData }) => {
  // navigation
  const params = useParams();
  const router = useRouter();

  // states
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // data
  const title = initialData ? "Edit size" : "Create size";
  const description = initialData ? "Edit a size" : "Add a new size";
  const toastMessage = initialData
    ? "Size updated successfully."
    : "Size created successfully.";
  const action = initialData ? "Save changes" : "Create";

  // form data
  const form = useForm<SizeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  // on size create/update
  const onSubmit = async (data: SizeFormValues) => {
    try {
      // show loader
      setLoading(true);

      // check if size data exists
      if (initialData) {
        // update existing size
        await axios.patch(
          `/api/${params.storeId}/sizes/${params.sizeId}`,
          data
        );
      } else {
        // add new size
        await axios.post(`/api/${params.storeId}/sizes`, data);
      }
      // refresh page
      router.refresh();

      // redirect to sizes page
      router.push(`/${params.storeId}/sizes`);

      // show success message
      toast.success(toastMessage);
    } catch (error) {
      // show error message
      toast.error("Something went wrong.");
    } finally {
      // hide loader
      setLoading(false);
    }
  };

  // on size delete
  const onDelete = async () => {
    try {
      // show loader
      setLoading(true);

      // delete size
      await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);

      // refresh page
      router.refresh();

      // redirect to sizes page
      router.push(`/${params.storeId}/sizes`);

      // show success message
      toast.success("Size deleted successfully.");
    } catch (error) {
      // show error message
      toast.error("Make sure you removed all products using this size first.");
    } finally {
      // hide loader
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      {/* size delete alert modal */}
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        {/* heading - create/update size */}
        <Heading title={title} description={description} />

        {/* show delete size btn, if initial data exists */}
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => {
              setOpen(true);
            }}
            title={`Delete ${initialData.name} size`}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* horizontal separator */}
      <Separator />

      {/* size create/update form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            {/* size name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Size name"
                      {...field}
                      title="Size name"
                    />
                  </FormControl>
                  {/* invalid name message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* size value */}
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Size value"
                      {...field}
                      title="Size value"
                    />
                  </FormControl>
                  {/* invalid value message */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* create/update size button */}
          <Button
            disabled={loading}
            className="ml-auto"
            type="submit"
            title={action}
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SizeForm;
