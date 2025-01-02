import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = 'api/';
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

const Services = {
    getAll: () => requests.get('service/all')
    getAllAvailable:
    create:
    update:
    delete:
}

const Orders = {
    getAll: () => requests.get('Order'),
    create: (order) => requests.postForm('Order', createFormData(order)),
    update: (order) => requests.putForm('Order', createFormData(order)),
    delete: (id: number) => requests.delete(`Order/${id}`),
};

const Users = {
    getAll: () => requests.get('User'),
    create: (user) => requests.postForm('User', createFormData(user)),
    update: (user) => requests.putForm('User', createFormData(user)),
    delete: (id: number) => requests.delete(`User/${id}`)
}

const Payments = {}
const Admin = {}
const AuthorizedCustomer = {}
const Reports = {}
const Statistics = {

};


const agent = {
    Services,
    Orders,
    Payments,
    Auth,
    Admin,
    AuthorizedCustomer,
    Reports,
    Statistics
};
;

export default agent;