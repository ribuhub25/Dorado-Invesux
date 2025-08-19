import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SupabaseService } from '../supabase/supabase';
import Votation from '../../models/votation';
import { PlayerService } from '../player/player';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private votationsSubject = new BehaviorSubject<Votation[]>([]);
  private countSubject = new BehaviorSubject<number>(0);
  count$ = this.countSubject.asObservable();
  votation$ = this.votationsSubject.asObservable();

  constructor(private _supabaseService: SupabaseService, private _playerService: PlayerService) {}

  getCount(count: number) {
    this.countSubject.next(count);
  }

  async insertVote(votation: Votation): Promise<boolean> {
    //OBTENER COUNT DE INICIO
    this._playerService.getPlayerById(votation.winner).then(player => {
      if(player) this.getCount(player.votes);
    });
    const { data, error } = await this._supabaseService.supabase.from("votation").insert(votation).select();
    if(data){
      //ACTUALIZAR TABLA
      this.votationsSubject.next([...this.votationsSubject.value, data[0]]);
      //ACTUALIZAR TABLA DE JUGADORES
      await this._playerService.updateCounter(votation.winner);
      //ACTUALIZAR CONTADOR
      this.countSubject.next(this.countSubject.value + 1);
    }
    return !error
  }

  async getVotes(): Promise<Votation[] | null>  {
    const { data: votation, error } = await this._supabaseService.supabase.from("votation").select('*')
    this.votationsSubject.next(votation ?? []);
    return votation
  }


}
