import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SupabaseService } from '../supabase/supabase';
import { Votation, VotationDTO } from '../../models/votation';
import { PlayerService } from '../player/player';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  private votationsSubject = new BehaviorSubject<VotationDTO[]>([]);
  votation$ = this.votationsSubject.asObservable();

  constructor(private _supabaseService: SupabaseService, private _playerService: PlayerService) {}

  async insertVote(votation: Votation): Promise<VotationDTO[] | null> {
    const { data, error } = await this._supabaseService.supabase
      .from('votation')
      .insert(votation)
      .select();
    if (error) {
      console.error('Error inserting vote:', error);
      return null;
    }
    if (data) {
      var playerInfo = await this._playerService.getPlayerById(data[0].winner);
      data[0].winner_txt = playerInfo?.names;
      //ACTUALIZAR TABLA
      this.votationsSubject.next([...this.votationsSubject.value, data[0]]);
      //ACTUALIZAR VOTO DE JUGADOR
      await this._playerService.updateCounter(votation.winner);
    }
    return data;
  }
  async getVotesForTable(): Promise<VotationDTO[] | null> {
    const { data } = await this._supabaseService.supabase.from('votation_with_winner').select('*');
    this.votationsSubject.next(data ?? []);
    return data;
  }

  async getVotes(): Promise<Votation[] | null> {
    const { data, error } = await this._supabaseService.supabase.from('votation').select(`*`);
    return data;
  }
  async deleteAllVotes(): Promise<boolean> {
    const { data, error } = await this._supabaseService.supabase
      .from('votation')
      .delete()
      .neq('id', 0);
    if (error) {
      this.votationsSubject.next([]);
    }
    return !error;
  }
}
