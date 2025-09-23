// Make clean image URL e.g http://localhost:3000/\uploads/\product-2334(localhost:3000/\uploads/\product-2334.png -> http://localhost:3000/uploads/product-2334.png
export const cleanImageUrl = (base, imagePath) => {
  return base.replace(/\/$/, "") + "/" + imagePath.replace(/^\//, "");
};
