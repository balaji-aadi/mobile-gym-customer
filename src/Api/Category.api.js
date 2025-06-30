import Api from "../Middleware/axios";

export const CategoryApi = {
  Allcategory: () => Api.get("/master/get-all-categories"),
  Allsession: () => Api.get("master/get-all-sessions"),
  getAllSubscription: () => Api.post("subscription/get-all-subscription"),
  getAllCategoriesById: (categoryId) => Api.post(`subscription/get-all-subscription/${categoryId}`),
};
