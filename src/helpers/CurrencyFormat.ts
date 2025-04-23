export function formatToBRL(value: string): string {
    const cleanValue = value.replace(/\D/g, "");
    const number = Number(cleanValue) / 100;
    return number.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

export function parseCurrencyBRLToNumber(value: string): number {
    return Number(value.replace(/\D/g, "")) / 100;
}