import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./components/navbar/navbar";
import { CardPlayer } from "./components/card-player/card-player";
import { MatTableModule } from '@angular/material/table';
import { Supabase } from './services/supabase/supabase';
import Player from './models/player';
import Tables from './models/core';

export interface VotationsDetail {
  name: string;
  winner: string;
  weight: number;
  cost: number;
}

const ELEMENT_DATA: VotationsDetail[] = [
  { name: 'Votante 1', winner: 'Hydrogen', weight: 78, cost: 100 },
  { name: 'Votante 2', winner: 'Helium', weight: 67, cost: 120 },
  { name: 'Votante 3', winner: 'Lithium', weight: 45.8, cost: 90 },
  { name: 'Votante 4', winner: 'Beryllium', weight: 78, cost: 110 },
  { name: 'Votante 5', winner: 'Boron', weight: 81, cost: 130 },
  { name: 'Votante 1', winner: 'Hydrogen', weight: 78, cost: 100 },
  { name: 'Votante 2', winner: 'Helium', weight: 67, cost: 120 },
  { name: 'Votante 3', winner: 'Lithium', weight: 45.8, cost: 90 },
  { name: 'Votante 4', winner: 'Beryllium', weight: 78, cost: 110 },
  { name: 'Votante 5', winner: 'Boron', weight: 81, cost: 130 },
];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, CardPlayer, MatTableModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App{
  protected readonly title = signal('invesux_sort');
  private readonly _supabase = inject(Supabase);
  players : Player[] | null = [];

  displayedColumns: string[] = ['name', 'winner', 'weight', 'cost'];
  dataSource = ELEMENT_DATA;

  async ngOnInit(): Promise<void> {
    //ACTUALIZA CADA VEZ QUE SE INSERTA UNO NUEVO
    this._supabase.players$.subscribe(data => {
      this.players = data;
    });

    this.players =  await this._supabase.getPlayers();
  }
}
