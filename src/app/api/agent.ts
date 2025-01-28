import axios, {AxiosResponse} from "axios";
import { CreateBasketItemDto, UpdateQuantityDto } from "../models/BasketItem";
import { CreateOrderDto } from "../models/Order";
import { CreateCouponDto, UpdateCouponDto } from "../models/Coupon";

axios.defaults.baseURL = 'http://localhost:5064/api/';
const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, data: FormData) => axios.post(url, data, {
    headers: {'Content-type': 'multipart/form-data'}
  }).then(responseBody),
  putForm: (url: string, data: FormData) => axios.put(url, data, {
    headers: {'Content-type': 'multipart/form-data'}
  }).then(responseBody)
}

function createFormData(item: any) {
  const formData = new FormData();
  for (const key in item) {
    if (Array.isArray(item[key])) {
      item[key].forEach((element: any, index: number) => {
        for (const subKey in element) {
          formData.append(`${key}[${index}].${subKey}`, element[subKey]);
        }
      });
    } else {
      formData.append(key, item[key]);
    }
  }
  return formData;
}

const Auth = {
  login: (credentials: any) => requests.post('auth/login', credentials),
  register: (user: any) => requests.post('auth/register', user),
  getAllUsers: () => requests.get('auth'),
  getAllAddresses: () => requests.get('address/all'),
  getAddresses: (userId: number) => requests.get(`address/user/${userId}`),
  createAddress: (address: any) => requests.post('address', createFormData(address)),
  updateAddress: (address: any) => requests.put('address', createFormData(address)),
  deleteAddress: (id: number) => requests.delete(`address/${id}`)
};

const Basket = {
  get: (userId: number) => requests.get(`basket/${userId}`),
  create: (basketItem: CreateBasketItemDto) => {
    return requests.postForm('basket', createFormData(basketItem));
  },
  updateQuantity: (updateDto: UpdateQuantityDto) => requests.putForm('basket/quantity', createFormData(updateDto)),
  delete: (id: number) => requests.delete(`basket/${id}`)
};

const Coupons = {
  getAll: () => requests.get('coupon'),
  create: (coupon: CreateCouponDto) => {
    const data = {
      ...coupon,
      startDate: new Date(coupon.startDate).toISOString(),
      endDate: new Date(coupon.endDate).toISOString(),
    };
    return requests.postForm('coupon', createFormData(data));
  },
  update: (coupon: UpdateCouponDto) => {
    const data = {
      ...coupon,
      startDate: new Date(coupon.startDate).toISOString(),
      endDate: new Date(coupon.endDate).toISOString(),
    };
    return requests.putForm('coupon', createFormData(data));
  },
  delete: (couponId: number) => requests.delete(`coupon/${couponId}`)
};

const Orders = {
  getAll: () => requests.get('order/all'),
  getByUser: (userId: number) => requests.get(`order/user/${userId}`),
  getById: (id: number) => requests.get(`order/${id}`),
  create: (orderDto: CreateOrderDto) => {
    return requests.postForm('order', createFormData(orderDto));
  },
  update: (order: any) => {
    const orderData = {
        ...order,
        collectedDate: order.collectedDate ? new Date(order.collectedDate).toISOString() : null,
        deliveredDate: order.deliveredDate ? new Date(order.deliveredDate).toISOString() : null
    };
    return requests.put('order', orderData);
  },
  getOrderItems: (orderId: number) => requests.get(`order/orderItems/${orderId}`),
};

const Payments = {
  create: (payment: any) => requests.post('payment', createFormData(payment))
};

const Reports = {
  cheque: (orderId: number) => axios.get(`reports/cheque/${orderId}`, {responseType: 'blob'}),
  priceList: () => axios.get('reports/price_list', { responseType: 'blob' }),
};

const Services = {
  getAll: () => requests.get('service/all'),
  getAllAvailable: () => requests.get('service/available'),
  getById: (id: number) => requests.get(`service/${id}`),
  create: (service: any) => requests.postForm(`service`, createFormData(service)),
  update: (service: any) => requests.putForm('service', createFormData(service)),
  delete: (id: number) => requests.delete(`service/${id}`)
}

const Statistics = {
  frequentCustomers: () => requests.get('statistics/frequent-customers'),
  frequentServices: () => requests.get('statistics/frequent-services'),
  lastMonthStats: () => requests.get('statistics/last-month-stats'),
  lastYearStats: () => requests.get('statistics/last-year-stats')
};

const agent = {
  Services,
  Orders,
  Payments,
  Auth,
  Basket,
  Coupons,
  Reports,
  Statistics,
};

export default agent;
