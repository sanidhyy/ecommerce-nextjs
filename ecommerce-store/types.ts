// billboard
export type Billboard = {
  id: string;
  label: string;
  imageUrl: string;
};

// category
export type Category = {
  id: string;
  name: string;
  billboard: Billboard;
};

// product
export type Product = {
  id: string;
  category: Category;
  name: string;
  price: string;
  isFeatured: boolean;
  size: Size;
  color: Color;
  images: Image[];
};

// image
export type Image = {
  id: string;
  url: string;
};

// size
export type Size = {
  id: string;
  name: string;
  value: string;
};

// color
export type Color = {
  id: string;
  name: string;
  value: string;
};
