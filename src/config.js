export const user_role = {
  customer: 3,
};

// const localUrl = "http://192.168.1.24:5008";
// const localUrl = "http://192.168.1.11:5010";
const localUrl = "http://192.168.1.19:5009";

// const liveUrl = "https://groomer.nablean.com";
// const deliveryLocalUrl = "http://192.168.29.30:5001";
// const deliveryLiveUrl = "http://192.168.29.30:5001";

const isLive = false;

export const serverUrl = isLive ? liveUrl : localUrl;
export const server = isLive ? `${liveUrl}/api/v1/` : `${localUrl}/api/v1/`;
// export const deliveryServer = isLive
//   ? `${deliveryLiveUrl}/api/v1/`
//   : `${deliveryLocalUrl}/api/v1/`;
