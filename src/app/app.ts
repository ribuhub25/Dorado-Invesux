import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./components/navbar/navbar";
import { CardPlayer } from "./components/card-player/card-player";
import { MatTableModule } from '@angular/material/table';
import Player from './models/player';
import { PlayerService } from './services/player/player';
import Votation from './models/votation';
import { VoteService } from './services/vote/vote';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, CardPlayer, MatTableModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App{
  protected readonly title = signal('invesux_sort');
  private readonly _playerService = inject(PlayerService);
  private readonly _votationService = inject(VoteService);

  players : Player[] | null = [];
  votations : Votation[] | null = [];

  displayedColumns: string[] = ['name', 'winner', 'weigth', 'cost'];
  dataSource = this.votations;

  async ngOnInit(): Promise<void> {
    //ACTUALIZA CADA VEZ QUE SE INSERTA UN NUEVO PARTICIPANTE
    this._playerService.players$.subscribe(data => {
      this.players = data;
    });

    //ACTUALIZA CADA VEZ QUE SE INSERTA UN NUEVO APOSTADOR
    this._votationService.votation$.subscribe(data => {
      this.dataSource = data;
    });

    this.dataSource = await this._votationService.getVotes();
    this.players =  await this._playerService.getPlayers();
  }
}
