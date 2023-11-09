"use client";

import * as z from "zod";
import { useState } from "react";
import axios from "axios";
import { Category, Color, Image, Product, Size } from "@prisma/client";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";
import ImageUpload from "@/components/ui/image-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// product form props
type ProductFormProps = {
  initialData:
    | (Product & {
        images: Image[];
      })
    | null;
  categories: Category[];
  colors: Color[];
  sizes: Size[];
};

// product form zod schema
const formSchema = z.object({
  name: z.string().min(1, "Required"),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1, "Required"),
  categoryId: z.string().min(1, "Required"),
  colorId: z.string().min(1, "Required"),
  sizeId: z.string().min(1, "Required"),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

// product form values
type ProductFormValues = z.infer<typeof formSchema>;

// product form
const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  sizes,
  colors,
}) => {
  // navigation
  const params = useParams();
  const router = useRouter();

  // states
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // data
  const title = initialData ? "Edit product" : "Create product";
  const description = initialData ? "Edit a product" : "Add a new product";
  const toastMessage = initialData
    ? "Product updated successfully."
    : "Product created successfully.";
  const action = initialData ? "Save changes" : "Create";

  // form data
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          price: parseFloat(String(initialData?.price)),
        }
      : {
          name: "",
          images: [],
          price: 0,
          categoryId: "",
          colorId: "",
          sizeId: "",
          isFeatured: false,
          isArchived: false,
        },
  });

  // on product create/update
  const onSubmit = async (data: ProductFormValues) => {
    try {
      // show loader
      setLoading(true);

      // check if product data exists
      if (initialData) {
        // update existing product
        await axios.patch(
          `/api/${params.storeId}/products/${params.productId}`,
          data
        );
      } else {
        // add new product
        await axios.post(`/api/${params.storeId}/products`, data);
      }

      // refresh page
      router.refresh();

      // redirect to products page
      router.push(`/${params.storeId}/products`);

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

  // on product delete
  const onDelete = async () => {
    try {
      // show loader
      setLoading(true);

      // delete product
      await axios.delete(`/api/${params.storeId}/products/${params.productId}`);

      // refresh page
      router.refresh();

      // redirect to products page
      router.push(`/${params.storeId}/products`);

      // show success message
      toast.success("Product deleted successfully.");
    } catch (error) {
      // show error message
      toast.error("Something went wrong.");
    } finally {
      // hide loader
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      {/* product delete alert modal */}
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        {/* heading - create/update product */}
        <Heading title={title} description={description} />

        {/* show delete product btn, if initial data exists */}
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => {
              setOpen(true);
            }}
            title={`Delete ${initialData.name} product`}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* horizontal separator */}
      <Separator />

      {/* product create/update form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          {/* product images */}
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  {/* cloudinary image upload */}
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={loading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>

                {/* invalid image(s) message */}
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            {/* product name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product label"
                      {...field}
                      title="Product label"
                    />
                  </FormControl>
                  {/* invalid name message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* product price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="9.99"
                      {...field}
                      title="Product price"
                    />
                  </FormControl>
                  {/* invalid price message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* product category */}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem title="Select a category">
                  <FormLabel>Category</FormLabel>
                  {/* select a category */}
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                          title="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>

                    {/* categories list */}
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id}
                          title={category.name}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* invalid category message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* product size */}
            <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem title="Select a size">
                  <FormLabel>Size</FormLabel>
                  {/* select a size */}
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a size"
                          title="Select a size"
                        />
                      </SelectTrigger>
                    </FormControl>

                    {/* sizes list */}
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem
                          key={size.id}
                          value={size.id}
                          title={size.name}
                        >
                          {size.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {/* invalid size message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* product color */}
            <FormField
              control={form.control}
              name="colorId"
              render={({ field }) => (
                <FormItem title="Select a color">
                  <FormLabel>Color</FormLabel>
                  {/* select a color */}
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a color"
                          title="Select a color"
                        />
                      </SelectTrigger>
                    </FormControl>

                    {/* colors list */}
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem
                          key={color.id}
                          value={color.id}
                          title={color.name}
                        >
                          {color.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {/* invalid color message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* is product featured */}
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  {/* featured */}
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      title="Featured"
                    />
                  </FormControl>
                  {/* featured text */}
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      This product will appear on the home page.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {/* is product archived */}
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  {/* archived */}
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      title="Archived"
                    />
                  </FormControl>
                  {/* archived text */}
                  <div className="space-y-1 leading-none">
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>
                      This product will not appear anywhere in the store.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* create/update product button */}
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

export default ProductForm;
