import Api from "../Middleware/axios";

export const CategoryApi = {
  Allcategory: () => Api.get("/master/get-all-categories"),
};
