"use client";

import * as z from "zod";
import { useState } from "react";
import axios from "axios";
import { Store } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

// icon
import { Trash } from "lucide-react";

// components
import { useOrigin } from "@/hooks/use-origin";
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
import { ApiAlert } from "@/components/ui/api-alert";
import { AlertModal } from "@/components/modals/alert-modal";

// setting form props
type SettingsFormProps = {
  initialData: Store;
};

// setting form zod schema
const formSchema = z.object({
  name: z.string().min(1, "Required"),
});

// setting form values
type SettingsFormValues = z.infer<typeof formSchema>;

// setting form
const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  // navigation
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  // states
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // form data
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  // on setting update
  const onSubmit = async (data: SettingsFormValues) => {
    try {
      // show loader
      setLoading(true);

      // update existing setting
      await axios.patch(`/api/stores/${params.storeId}`, data);

      // refresh page
      router.refresh();

      // show success message
      toast.success("Store updated successfully.");
    } catch (error) {
      // show error message
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // on store delete
  const onDelete = async () => {
    try {
      // show loader
      setLoading(true);

      // delete store
      await axios.delete(`/api/stores/${params.storeId}`);

      // refresh page
      router.refresh();

      // redirect to store page
      router.push("/");

      // show success message
      toast.success("Store deleted successfully.");
    } catch (error) {
      // show error message
      toast.error("Make sure you removed all products and categories first.");
    } finally {
      // hide loader
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      {/* store delete alert modal */}
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        {/* heading - settings */}
        <Heading title="Settings" description="Manage store preferences" />

        {/* delete settings btn */}
        <Button
          disabled={loading}
          variant="destructive"
          size="icon"
          onClick={() => {
            setOpen(true);
          }}
          title={`Delete ${initialData.name}`}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>

      {/* horizontal separator */}
      <Separator />

      {/* store settings update form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
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
                      placeholder="Store name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* save changes btn */}
          <Button
            disabled={loading}
            className="ml-auto"
            type="submit"
            title="Save changes"
          >
            Save changes
          </Button>
        </form>
      </Form>

      {/* horizontal separator */}
      <Separator />

      {/* settings api url */}
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}`}
        variant="public"
      />
    </>
  );
};

export default SettingsForm;
