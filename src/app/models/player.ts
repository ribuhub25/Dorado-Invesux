interface Player{
    id: number
    created_at: Date,
    names: string,
    ocupation: Ocupation | null,
    weigth_start: number,
    weigth_end: number,
    votes: number
}

export enum Ocupation{
    vendedor = "Vendedor",
    jefe = "Jefe",
    almacen = "Almacén"
}

export default Player;