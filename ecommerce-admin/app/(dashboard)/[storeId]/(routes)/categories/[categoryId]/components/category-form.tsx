"use client";

import * as z from "zod";
import { useState } from "react";
import axios from "axios";
import { Billboard, Category } from "@prisma/client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// category form props
type CategoryFormProps = {
  initialData: Category | null;
  billboards: Billboard[];
};

// category form zod schema
const formSchema = z.object({
  name: z.string().min(1, "Required"),
  billboardId: z.string().min(1, "Required"),
});

// category form values
type CategoryFormValues = z.infer<typeof formSchema>;

// category form
const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  billboards,
}) => {
  // navigation
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // states
  const params = useParams();
  const router = useRouter();

  // data
  const title = initialData ? "Edit category" : "Create category";
  const description = initialData ? "Edit a category" : "Add a new category";
  const toastMessage = initialData
    ? "Category updated successfully."
    : "Category created successfully.";
  const action = initialData ? "Save changes" : "Create";

  // form data
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      billboardId: "",
    },
  });

  // on category create/update
  const onSubmit = async (data: CategoryFormValues) => {
    try {
      // show loader
      setLoading(true);

      // check if category data exists
      if (initialData) {
        // update existing category
        await axios.patch(
          `/api/${params.storeId}/categories/${params.categoryId}`,
          data
        );
      } else {
        // add new category
        await axios.post(`/api/${params.storeId}/categories`, data);
      }
      // refresh page
      router.refresh();

      // redirect to categories page
      router.push(`/${params.storeId}/categories`);

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

  // on category delete
  const onDelete = async () => {
    try {
      // show loader
      setLoading(true);

      // delete category
      await axios.delete(
        `/api/${params.storeId}/categories/${params.categoryId}`
      );

      // refresh page
      router.refresh();

      // redirect to categories page
      router.push(`/${params.storeId}/categories`);

      // show success message
      toast.success("Category deleted successfully.");
    } catch (error) {
      // show error message
      toast.error(
        "Make sure you removed all products using this category first."
      );
    } finally {
      // hide loader
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      {/* category delete alert modal */}
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        {/* heading - create/update category */}
        <Heading title={title} description={description} />

        {/* show delete category btn, if initial data exists */}
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => {
              setOpen(true);
            }}
            title={`Delete ${initialData.name} category`}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* horizontal separator */}
      <Separator />

      {/* category create/update form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            {/* category name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Category Name"
                      {...field}
                      title="Category name"
                    />
                  </FormControl>
                  {/* invalid name message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* select a billboard */}
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl title="Select a billboard">
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a billboard"
                          title="Select a billboard"
                        />
                      </SelectTrigger>
                    </FormControl>

                    {/* billboard(s) list */}
                    <SelectContent>
                      {billboards.map((billboard) => (
                        <SelectItem
                          key={billboard.id}
                          value={billboard.id}
                          title={billboard.label}
                        >
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {/* invalid billboard message */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* create/update category button */}
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

export default CategoryForm;
