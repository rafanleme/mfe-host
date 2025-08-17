declare module "sales/App";
declare module "cart/App";
declare module "host/authApi";
declare module "checkout/App";
declare module "host/cartApi" {
  const api: CartApi;
  export default api;
  export { api as cartApi };
}
