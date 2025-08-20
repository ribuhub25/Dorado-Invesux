export interface Votation{
    id: number
    created_at: Date,
    name: string,
    winner: number,
    weigth: number,
    cost: number
}

export interface VotationDTO {
  id: number;
  name: string;
  winner: number;
  winner_txt: string;
  weigth: number;
  cost: number;
  created_at: string;
}

