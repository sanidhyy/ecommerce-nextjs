"use client";

import * as z from "zod";
import { useState } from "react";
import axios from "axios";
import { Color } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

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

// color form props
type ColorFormProps = {
  initialData: Color | null;
};

// color form zod schema
const formSchema = z.object({
  name: z.string().min(1, "Required"),
  value: z
    .string()
    .min(4, "String must be a valid hex code")
    .regex(/^#/, { message: "String must be a valid hex code" }),
});

// color form values
type ColorFormValues = z.infer<typeof formSchema>;

// color form
const ColorForm: React.FC<ColorFormProps> = ({ initialData }) => {
  // navigation
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // states
  const params = useParams();
  const router = useRouter();

  // data
  const title = initialData ? "Edit color" : "Create color";
  const description = initialData ? "Edit a color" : "Add a new color";
  const toastMessage = initialData
    ? "Color updated successfully."
    : "Color created successfully.";
  const action = initialData ? "Save changes" : "Create";

  // form data
  const form = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  // on color create/update
  const onSubmit = async (data: ColorFormValues) => {
    try {
      // show loader
      setLoading(true);

      // check if color data exists
      if (initialData) {
        // update existing color
        await axios.patch(
          `/api/${params.storeId}/colors/${params.colorId}`,
          data
        );
      } else {
        // add new color
        await axios.post(`/api/${params.storeId}/colors`, data);
      }
      // refresh page
      router.refresh();

      // redirect to colors page
      router.push(`/${params.storeId}/colors`);

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

  // on color delete
  const onDelete = async () => {
    try {
      // show loader
      setLoading(true);

      // delete color
      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);

      // refresh page
      router.refresh();

      // redirect to colors page
      router.push(`/${params.storeId}/colors`);

      // show success message
      toast.success("Color deleted successfully.");
    } catch (error) {
      // show error message
      toast.error("Make sure you removed all products using this color first.");
    } finally {
      // hide loader
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      {/* color delete alert modal */}
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        {/* heading - create/update color */}
        <Heading title={title} description={description} />

        {/* show delete color btn, if initial data exists */}
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => {
              setOpen(true);
            }}
            title={`Delete ${initialData.name} color`}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* horizontal separator */}
      <Separator />

      {/* color create/update form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            {/* color name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Color name"
                      {...field}
                      title="Color name"
                    />
                  </FormControl>
                  {/* invalid name message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* color value */}
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input
                        disabled={loading}
                        placeholder="Color value"
                        title="Color value"
                        {...field}
                      />
                      <div
                        className="border p-4 rounded-full"
                        style={{ backgroundColor: field.value }}
                        title="Color preview"
                      />
                    </div>
                  </FormControl>
                  {/* invalid value message */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* create/update color button */}
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

export default ColorForm;
