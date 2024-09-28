import { create } from "zustand";

const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    const { name, price, image } = newProduct;
    if (!name || !price || !image) {
      return { success: false, message: "Please fill all the fields[FE]" };
    }

    const res = await fetch("/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    //data is received from backend
    set((prevState) => ({ products: [...prevState.products, data.data] }));
    return { success: true, message: "Product Created Successfully[FE]" };
  },
  fetchProducts: async () => {
    const res = await fetch("/api/product");
    const data = await res.json();
    set({ products: data.data });
  },

  deleteProduct: async (id) => {
    const res = await fetch(`/api/product/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data.message);
    if (data.success) {
      //updating the state,which re-renders the component and refresh the page
      set((prevState) => ({
        products: prevState.products.filter((product) => product._id !== id),
      }));
      return data;
    }
  },
}));

export default useProductStore;
