"use client";

import * as z from "zod";
import { useState } from "react";
import axios from "axios";
import { Billboard } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
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
import ImageUpload from "@/components/ui/image-upload";

// billboard form props
type BillboardFormProps = {
  initialData: Billboard | null;
};

// billboard form zod schema
const formSchema = z.object({
  label: z.string().min(1, "Required"),
  imageUrl: z.string().min(1, "Required"),
});

// billboard form values
type BillboardFormValues = z.infer<typeof formSchema>;

// billboard form
const BillboardForm: React.FC<BillboardFormProps> = ({ initialData }) => {
  // navigation
  const params = useParams();
  const router = useRouter();

  // states
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // data
  const title = initialData ? "Edit billboard" : "Create billboard";
  const description = initialData ? "Edit a billboard" : "Add a new billboard";
  const toastMessage = initialData
    ? "Billboard updated successfully."
    : "Billboard created successfully.";
  const action = initialData ? "Save changes" : "Create";

  // form data
  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  // on billboard create/update
  const onSubmit = async (data: BillboardFormValues) => {
    try {
      // show loader
      setLoading(true);

      // check if billboard data exists
      if (initialData) {
        // update existing billboard
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          data
        );
      } else {
        // add new billboard
        await axios.post(`/api/${params.storeId}/billboards`, data);
      }

      // refresh page
      router.refresh();

      // redirect to billboards page
      router.push(`/${params.storeId}/billboards`);

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

  // on billboard delete
  const onDelete = async () => {
    try {
      // show loader
      setLoading(true);

      // delete billboard
      await axios.delete(
        `/api/${params.storeId}/billboards/${params.billboardId}`
      );

      // refresh page
      router.refresh();

      // redirect to billboards page
      router.push(`/${params.storeId}/billboards`);

      // show success message
      toast.success("Billboard deleted successfully.");
    } catch (error) {
      // show error message
      toast.error(
        "Make sure you removed all categories using this billboard first."
      );
    } finally {
      // hide loader
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      {/* billboard delete alert modal */}
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />

      <div className="flex items-center justify-between">
        {/* heading - create/update billboard */}
        <Heading title={title} description={description} />

        {/* show delete billboard btn, if initial data exists */}
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => {
              setOpen(true);
            }}
            title={`Delete ${initialData.label} billboard`}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* horizontal separator */}
      <Separator />

      {/* billboard create/update form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          {/* billboard image */}
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                  {/* cloudinary image upload */}
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>

                {/* invalid image message */}
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-3 gap-8">
            {/* billboard label */}
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billboard label"
                      {...field}
                      title="Billboard label"
                    />
                  </FormControl>

                  {/* invalid label message */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* create/update billboard button */}
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

export default BillboardForm;
