import axios, {AxiosResponse} from "axios";
import { CreateBasketItemDto, UpdateQuantityDto } from "../models/BasketItem";

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
    formData.append(key, item[key])
  }
  return formData;
}

const Auth = {
  login: (credentials: any) => requests.post('auth/login', credentials),
  register: (user: any) => requests.post('auth/register', user),
  // getAll: () => requests.get('auth/all'),
  // getById: (id: number) => requests.get(`auth/${id}`)
};

const Basket = {
  get: (userId: number) => requests.get(`basket/${userId}`),
  create: (basketItem: CreateBasketItemDto) => {
    // Make sure to return the result:
    return requests.postForm('basket', createFormData(basketItem));
  },
  updateQuantity: (updateDto: UpdateQuantityDto) => requests.putForm('basket/quantity', createFormData(updateDto)),
  delete: (id: number) => requests.delete(`basket/${id}`)
};

const Coupons = {
  getAll: () => requests.get('coupon'),
  create: (coupon: any) => requests.post('coupon', createFormData(coupon)),
  update: (coupon: any) => requests.put('coupon', createFormData(coupon)),
  redeem: (code: string) => requests.post(`coupon/${code}`, {}),
  delete: (couponId: number) => requests.delete(`coupon/${couponId}`)
};

const Orders = {
  getAll: () => requests.get('order/all'),
  getByUser: (userId: number) => requests.get(`order/user/${userId}`),
  getById: (id: number) => requests.get(`order/${id}`),
  create: (order: any) => requests.post('order', createFormData(order)),
  update: (order: any) => requests.put('order', createFormData(order)),
  updateStatus: (orderId: number) => requests.put(`order/status/${orderId}`, {})
};

const Payments = {
  create: (payment: any) => requests.post('payment', createFormData(payment))
};

const Reports = {
  cheque: () => axios.get('reports/cheque', {responseType: 'blob'}),
  priceList: () => axios.get('reports/price_list', { responseType: 'blob' }),
};

const Services = {
  getAll: () => requests.get('service/all'),
  getAllAvailable: () => requests.get('service/available'),
  getById: (id: number) => requests.get(`service/${id}`),
  create: (service: any) => requests.postForm(`service`, createFormData(service)),
  // create: (service: any) => {
  //   fetch('http://localhost:5064/api/service', { method: 'POST', body: createFormData(service) })
  //     .then(response => response.json())
  //     .then(data => console.log('Success:', data))
  //     .catch(error => console.error('Error:', error));
  // },
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
