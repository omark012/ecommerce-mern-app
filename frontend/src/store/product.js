import { create } from "zustand";

const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    const { name, price, image } = newProduct;
    if (!name || !price || !image) {
      return { success: false, message: "Please fill all the fields[FE]" };
    }

    const res = await fetch("/product", {
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
    const res = await fetch("/product");
    const data = await res.json();
    console.log("data i got", data.data);
    set({ products: data.data });
  },

  deleteProduct: async (id) => {
    const res = await fetch(`/product/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data.message);
    if (data.success) {
      //when we update the state,it immediately updates the UI without the need of refresh page
      set((prevState) => ({
        products: prevState.products.filter((product) => product._id !== id),
      }));
      return data;
    }
  },
  updateProduct: async (id, updatedProduct) => {
    const res = await fetch(`/product/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if (!data.success) {
      return data;
    }

    //when we update the state,it immediately updates the UI without the need of refresh page`
    set((prevState) => ({
      products: prevState.products.map((product) =>
        product._id === id ? data.data : product
      ),
    }));
    return data;
  },
}));

export default useProductStore;
