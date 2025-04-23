import { ISelectOptions } from "../interfaces/ISelectOptions";

export const OrderFilterOptions: ISelectOptions[] = [
    {
        name: "Mais Recente",
        value: "RECENT"
    },
    {
        name: "Menor Preço",
        value: "MINPRICE"
    },
    {
        name: "Maior Preço",
        value: "MAXPRICE"
    },
    {
        name: "Mais Antigo",
        value: "OLD"
    }
];