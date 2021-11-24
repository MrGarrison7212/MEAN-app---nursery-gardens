export interface Narudzbina{
    id: number;
    proizvodjac: string;
    magacin: string;
    status: string;
    datum: Date;
    cena: number;
    vrsta: number;
    proizvodi: Array<number>;
}