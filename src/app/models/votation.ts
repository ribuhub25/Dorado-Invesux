interface Votation{
    id: number
    created_at: Date,
    name: string,
    winner: number,
    weigth: number,
    cost: number
}

export default Votation;