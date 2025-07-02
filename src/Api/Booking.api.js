import Api from "../Middleware/axios";

export const BookingApi = {
  createSubscription: (payload) => Api.post("booking/subscribe", payload),
  getSubscriptionDetailsById: (id) =>
    Api.get(`booking/get-booking-by-id/${id}`),
};
