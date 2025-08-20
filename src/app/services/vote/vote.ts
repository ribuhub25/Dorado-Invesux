import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SupabaseService } from '../supabase/supabase';
import Votation from '../../models/votation';
import { PlayerService } from '../player/player';

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  private votationsSubject = new BehaviorSubject<Votation[]>([]);
  votation$ = this.votationsSubject.asObservable();

  constructor(private _supabaseService: SupabaseService, private _playerService: PlayerService) {}

  async insertVote(votation: Votation): Promise<Votation[] | null> {
    const { data, error } = await this._supabaseService.supabase
      .from('votation')
      .insert(votation)
      .select();
    if (error) {
      console.error('Error inserting vote:', error);
      return null;
    }
    if (data) {
      //ACTUALIZAR TABLA
      this.votationsSubject.next([...this.votationsSubject.value, data[0]]);
      //ACTUALIZAR VOTO DE JUGADOR
      await this._playerService.updateCounter(votation.winner);
    }
    return data;
  }

  async getVotes(): Promise<Votation[] | null> {
    const { data: votation, error } = await this._supabaseService.supabase
      .from('votation')
      .select('*');
    this.votationsSubject.next(votation ?? []);
    return votation;
  }
  async deleteAllVotes(): Promise<boolean> {
    const { data, error } = await this._supabaseService.supabase
      .from('votation')
      .delete()
      .neq('id', 0);
    if (error) { this.votationsSubject.next([]); }
    return !error;
  }
}
