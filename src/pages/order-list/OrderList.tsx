import { ImExit } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/table/Table';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useLoading from '../../hooks/useLoading';
import { OrderModel } from '../../models/OrderModel';
import Loading from '../../components/loading/Loading';
import { DeleteAllOrders, GetAllOrders, GetAllOrdersFiltered } from '../../apis/OrderAPI';
import './OrderList.css';
import { OrderFilterOptions } from '../../statics/OrderFilterOptions';
import { ActiveOptions } from '../../statics/ActiveOptionsStatic';
import { OrderTypeOptions } from '../../statics/OrderTypeOptions';
import Select from '../../components/select/Select';
import ConfirmDeleteModal from '../../components/confirm-delete-modal/ConfirmDeleteModal';

function OrderList() {
    const { startLoading, stopLoading, loading } = useLoading();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [orders, setOrders] = useState<OrderModel[]>([]);
    const [orderDeleted, setOrderDeleted] = useState<boolean>(false);
    const [orderFilter, setOrderFilter] = useState<string>(OrderFilterOptions[0].value);
    const [activeFilter, setActiveFilter] = useState<string>("");
    const [orderTypeFilter, setOrderTypeFilter] = useState<string>("");
    const navigation = useNavigate();

    function exit() {
        navigation("/");
    }

    function toggleShowModal() {
        setOpenModal(!openModal);
    }

    function clearFilter() {
        setOrderFilter(OrderFilterOptions[0].value);
        setActiveFilter("");
        setOrderTypeFilter("");
    }

    async function deleteAllOrders() {
        toggleShowModal();
        startLoading();
        try {
            await DeleteAllOrders().then(() => {
                toast.success("Todas as Ordens foram deletadas!");
                clearFilter();
                getAllOrders();
            });
        }
        catch (error: any) {
            let errorMessage = "Não foi possível deletar todas as ordens, por favor, tente mais tarde!";

            if (error instanceof Error) {
                try {
                    const parsed = JSON.parse(error.message);
                    errorMessage = parsed.msg_erro || error.message;
                } catch (parseError) {
                    errorMessage = error.message;
                }
            }

            toast.error(errorMessage);
        }
        finally {
            stopLoading();
        }
    }

    async function getAllOrders() {
        startLoading();
        try {
            await GetAllOrders().then(result => {
                var data = result.data as OrderModel[];
                setOrders(data);
            });
        }
        catch (error: any) {
            let errorMessage = "Não foi possível obter as ordens, por favor, tente mais tarde!";

            if (error instanceof Error) {
                try {
                    const parsed = JSON.parse(error.message);
                    errorMessage = parsed.msg_erro || error.message;
                } catch (parseError) {
                    errorMessage = error.message;
                }
            }

            toast.error(errorMessage);
        }
        finally {
            if (orderDeleted) {
                setOrderDeleted(false);
            }
            stopLoading();
        }
    }

    async function getAllOrdersFiltered() {
        startLoading();
        try {
            const query = new URLSearchParams();

            if (orderFilter !== OrderFilterOptions[0].value) query.set("order", orderFilter);
            if (activeFilter !== "") query.set("activeType", activeFilter);
            if (orderTypeFilter !== "") query.set("orderType", orderTypeFilter);

            await GetAllOrdersFiltered(query.toString()).then(result => {
                var data = result.data as OrderModel[];
                setOrders(data);
            });
        }
        catch (error: any) {
            let errorMessage = "Não foi possível obter as ordens, por favor, tente mais tarde!";

            if (error instanceof Error) {
                try {
                    const parsed = JSON.parse(error.message);
                    errorMessage = parsed.msg_erro || error.message;
                } catch (parseError) {
                    errorMessage = error.message;
                }
            }

            toast.error(errorMessage);
        }
        finally {
            stopLoading();
        }
    }

    useEffect(() => {
        getAllOrders();
    }, []);

    useEffect(() => {
        if (orderDeleted) {
            getAllOrdersFiltered();
        }
    }, [orderDeleted]);

    return (
        <div className='orderList-container'>
            {loading && <Loading />}
            <div className='orderList-header-container'>
                <h1>Lista de Ordens</h1>
                <button onClick={exit} className='btn-exit'>
                    <span>Voltar</span>
                    <ImExit size={15} />
                </button>
            </div>
            <div className='filter-container'>
                <div className="filter-border-container">
                    <div className="active-filter">
                        <Select
                            name='activeFilter'
                            options={[{ name: "Todos Ativos", value: "" }, ...ActiveOptions]}
                            setValue={setActiveFilter}
                            value={activeFilter}
                        />
                    </div>
                    <div className="order-type-filter">
                        <Select
                            name='orderTypeFilter'
                            options={[{ name: "Todos Lados", value: "" }, ...OrderTypeOptions]}
                            setValue={setOrderTypeFilter}
                            value={orderTypeFilter}
                        />
                    </div>
                    <div className="order-filter">
                        <Select
                            name='orderFilter'
                            options={OrderFilterOptions}
                            setValue={setOrderFilter}
                            value={orderFilter}
                        />
                    </div>
                    <button onClick={getAllOrdersFiltered} className='btn-filter'>Filtrar</button>
                </div>
            </div>
            <Table
                startLoading={startLoading}
                stopLoading={stopLoading}
                setOrderDeleted={setOrderDeleted}
                orders={orders}
            />
            {orders.length > 0 &&
                <div className='btn-delete-massive-container'>
                    <button onClick={toggleShowModal} className='btn-delete-massive'>Deletar Todas as Ordens</button>
                </div>
            }
            <ConfirmDeleteModal onCancel={toggleShowModal} onConfirm={deleteAllOrders} isOpen={openModal} />
        </div>
    );
}

export default OrderList;