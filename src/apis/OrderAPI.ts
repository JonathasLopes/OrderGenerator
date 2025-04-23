import { IOrder } from '../interfaces/IOrder';
import { api } from '../services/Axios';

const GetAllOrders = async () => {
    try {
        const result = await api.get(`/getAll`);
        const response = await result.data;
        return response;
    }
    catch (error: any) {
        throw new Error(JSON.stringify(error.response.data));
    }
}

const GetAllOrdersFiltered = async (filter: string) => {
    try {
        const result = await api.get(`/getByFilter?${filter}`);
        const response = await result.data;
        return response;
    }
    catch (error: any) {
        throw new Error(JSON.stringify(error.response.data));
    }
}

const DeleteOrder = async (id: string) => {
    try {
        const result = await api.delete(`/delete?id=${id}`);
        const response = await result.data;
        return response;
    }
    catch (error: any) {
        throw new Error(JSON.stringify(error.response.data));
    }
}

const DeleteAllOrders = async () => {
    try {
        const result = await api.delete(`/deleteAll`);
        const response = await result.data;
        return response;
    }
    catch (error: any) {
        throw new Error(JSON.stringify(error.response.data));
    }
}

const CreateOrder = async (order: IOrder) => {
    try {
        const result = await api.post(`/postFinancialExposure`, order);
        const response = await result.data;
        return response;
    }
    catch (error: any) {
        throw new Error(JSON.stringify(error.response.data));
    }
}

export {
    GetAllOrders,
    GetAllOrdersFiltered,
    DeleteOrder,
    DeleteAllOrders,
    CreateOrder
}