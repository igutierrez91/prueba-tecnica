export interface Transaction {
    id: number;
    idPayer: number,
    name: string;
    amount: number;
    date: string;
    description: string;
}