import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SupabaseService } from '../supabase/supabase';
import Player from '../../models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private playersSubject = new BehaviorSubject<Player[]>([]);
  players$ = this.playersSubject.asObservable();
  constructor(private _supabaseService: SupabaseService) {}

  async insertPlayer(player: Player): Promise<boolean> {
    const { data, error } = await this._supabaseService.supabase.from("player").insert(player).select();
    if(data) this.playersSubject.next([...this.playersSubject.value, data[0]]);
    return !error
  }

  async getPlayers(): Promise<Player[] | null>  {
    const { data: player, error } = await this._supabaseService.supabase.from("player").select('*')
    this.playersSubject.next(player ?? []);
    return player
  }

  async getPlayerByName(name: string): Promise<Player | null>  {
    const { data: player, error } = await this._supabaseService.supabase.from("player").select('*').eq('name', name).single()
    return player
  }
}
