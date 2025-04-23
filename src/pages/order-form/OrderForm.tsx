import { useEffect, useState } from 'react';
import { ActiveOptions } from '../../statics/ActiveOptionsStatic';
import { OrderTypeOptions } from '../../statics/OrderTypeOptions';
import './OrderForm.css';
import { IOrder } from '../../interfaces/IOrder';
import { formatToBRL, parseCurrencyBRLToNumber } from '../../helpers/CurrencyFormat';
import useLoading from '../../hooks/useLoading';
import Loading from '../../components/loading/Loading';
import { toast } from 'react-toastify';
import { CreateOrder } from '../../apis/OrderAPI';
import Select from '../../components/select/Select';
import { MdKeyboardArrowRight } from 'react-icons/md';

function OrderForm() {
    const { startLoading, stopLoading, loading } = useLoading();
    const [active, setActive] = useState<string>("");
    const [orderType, setOrderType] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(0);
    const [price, setPrice] = useState<string>("0,00");
    const [btnDisabled, setBtnDisabled] = useState<boolean>(true);

    async function submitForm() {
        try {
            startLoading();

            const order: IOrder = {
                ativo: active,
                lado: orderType,
                preco: parseCurrencyBRLToNumber(price),
                quantidade: quantity
            }

            await CreateOrder(order).then(() => {
                toast.success("Ordem criada com sucesso!");
                clearAll();
            });
        } catch (error: any) {
            let errorMessage = "Não foi possível criar a ordem, por favor, tente novamente mais tarde!";

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
            stopLoading();
        }
    }

    function clearAll() {
        setActive("");
        setQuantity(0);
        setOrderType("");
        setPrice("0,00");
    }

    function toggleBtnDisabled() {
        setBtnDisabled(!btnDisabled);
    }

    useEffect(() => {
        if (active !== "" && orderType !== "" && quantity > 0 && quantity < 100000 && parseCurrencyBRLToNumber(price) > 0 && parseCurrencyBRLToNumber(price) < 1000 && btnDisabled) {
            toggleBtnDisabled();
        } else if ((active === "" || orderType === "" || quantity <= 0 || quantity >= 100000 || parseCurrencyBRLToNumber(price) <= 0 || parseCurrencyBRLToNumber(price) >= 1000) && !btnDisabled)
            toggleBtnDisabled();
    }, [active, orderType, quantity, price]);

    return (
        <div className='order-container'>
            {loading && <Loading />}
            <form>
                <div className='active-orderType-container'>
                    <div className="active-container">
                        <label htmlFor="activeSelect">Ativo:</label>
                        <Select
                            name='activeFilter'
                            options={[{ name: "Selecione um Ativo", value: "" }, ...ActiveOptions]}
                            setValue={setActive}
                            value={active}
                            firstOptionIsDisabled={true}
                        />
                    </div>
                    <div className="order-type-container">
                        <label htmlFor="orderTypeSelect">Lado:</label>
                        <Select
                            name='orderTypeFilter'
                            options={[{ name: "Selecione um Lado", value: "" }, ...OrderTypeOptions]}
                            setValue={setOrderType}
                            value={orderType}
                            firstOptionIsDisabled={true}
                        />
                    </div>
                </div>
                <div className='quantity-price-container'>
                    <div className="quantity-container">
                        <label htmlFor="quantityInput">Quantidade:</label>
                        <input
                            value={quantity === 0 ? "" : quantity}
                            placeholder='0'
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            onFocus={(e) => {
                                if (quantity === 0) e.target.value = "";
                            }}
                            onBlur={(e) => {
                                if (e.target.value.trim() === "") setQuantity(0);
                            }}
                            name='quantityInput'
                            type="number"
                            id="quantityInput"
                        />
                        {quantity >= 100000 && <small className='error-msg'>A quantidade ultrapassou o limite estipulado de 99.999.</small>}
                    </div>
                    <div className="price-container">
                        <label htmlFor="priceInput">Preço:</label>
                        <input
                            placeholder='0,00'
                            onFocus={(e) => {
                                if (parseCurrencyBRLToNumber(price) === 0) e.target.value = "";
                            }}
                            onBlur={(e) => {
                                if (e.target.value.trim() === "") setPrice("R$ 0,00");
                            }}
                            onChange={(e) => setPrice(formatToBRL(e.target.value))}
                            value={price}
                            name='priceInput'
                            type="text"
                            id="priceInput"
                        />
                        {parseCurrencyBRLToNumber(price) >= 1000 && <small className='error-msg'>O preço ultrapassou o limite estipulado de R$ 999,99.</small>}
                    </div>
                </div>

                <div className='send-data-btn-container'>
                    <button disabled={btnDisabled} onClick={submitForm} type='button' className="send-data-btn">Gerar Ordem</button>
                </div>

                <hr className='hr-yellow' />

                <div className='go-to-list'>
                    <a href="/list">
                        Ver Todas as Ordens
                        <MdKeyboardArrowRight />
                    </a>
                </div>
            </form>
        </div>
    )
}

export default OrderForm;