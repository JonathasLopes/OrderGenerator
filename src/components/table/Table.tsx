import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import Pagination from './pagination/Pagination';
import { toast } from 'react-toastify';
import { OrderModel } from '../../models/OrderModel';
import { formatToBRL } from '../../helpers/CurrencyFormat';
import './Table.css';
import { DeleteOrder } from '../../apis/OrderAPI';
import ConfirmDeleteModal from '../confirm-delete-modal/ConfirmDeleteModal';

interface ITableProps {
    orders: OrderModel[],
    setOrderDeleted: React.Dispatch<React.SetStateAction<boolean>>,
    startLoading: () => void,
    stopLoading: () => void
}

function Table(props: ITableProps) {
    const { orders, setOrderDeleted, startLoading, stopLoading } = props;
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [idToDelete, setIdToDelete] = useState<string>("");
    const [page, setPage] = useState(1);
    const [orderPaginated, setOrderPaginated] = useState<OrderModel[]>([]);

    function toggleShowModal() {
        setOpenModal(!openModal);
    }

    async function deleteOrder(id: string) {
        startLoading();
        try {
            await DeleteOrder(id).then(() => {
                toast.success("Ordem deletada com sucesso!");
                setOrderDeleted(true);
            });
        } catch (error: any) {
            let errorMessage = "Não foi possível deletar a ordem, por favor, tente novamente mais tarde!";

            if (error instanceof Error) {
                try {
                    const parsed = JSON.parse(error.message);
                    errorMessage = parsed.msg_erro || error.message;
                } catch (parseError) {
                    errorMessage = error.message;
                }
            }

            toast.error(errorMessage);
        } finally {
            setIdToDelete("");
            stopLoading();
        }
    }

    function cancelDelete() {
        setIdToDelete("");
        toggleShowModal();
    }

    function confirmDelete() {
        deleteOrder(idToDelete);
        toggleShowModal();
    }

    function confirmDeleteWithModal(id: string) {
        setIdToDelete(id);
        toggleShowModal();
    }

    function getByPage() {
        let start = (page - 1) * 13;

        let orderSlice = orders.slice(start, start + 13);

        setOrderPaginated(orderSlice);
    }

    function fillEmptyLines() {
        let orderPaginatedLength = orderPaginated.length;
        var array: any = [];

        for (let i = 0; i < (9 - orderPaginatedLength); i++) {
            array.push(
                <tr key={i}>
                    {(orderPaginatedLength === 0 && i === 0) ?
                        <td className='text-center' colSpan={5}>
                            <span>Não há informações no momento</span>
                        </td>
                        :
                        <td colSpan={5}></td>
                    }
                </tr>
            );
        }

        return array;
    }

    useEffect(() => {
        getByPage();
    }, [page, orders]);

    return (
        <>
            <table className='table-container'>
                <tbody>
                    <tr>
                        <th>Tipo de Ativo</th>
                        <th>Lado</th>
                        <th>Quantidade</th>
                        <th>Preço</th>
                        <th>Ações</th>
                    </tr>
                    {orderPaginated.map((order, index) => {
                        return (
                            <tr key={index}>
                                <td>{order.ActiveType}</td>
                                <td>{order.OrderType === "C" ? "Compra" : "Venda"}</td>
                                <td>{order.Quantity}</td>
                                <td>{formatToBRL(order.Price.toFixed(2))}</td>
                                <td>
                                    <button onClick={() => confirmDeleteWithModal(order.Id)} className='btn-trash'>
                                        <FaTrash size={15} />
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    {orderPaginated.length < 13 && fillEmptyLines()}
                </tbody>
            </table>
            <Pagination total={orders.length} page={page} setPage={setPage} />
            <ConfirmDeleteModal onCancel={cancelDelete} onConfirm={confirmDelete} isOpen={openModal} />
        </>
    )
}

export default Table;