import { Injectable } from '@angular/core';
import { createClient, PostgrestError } from '@supabase/supabase-js'
import { environment } from '../supabase/credentials';
import Player from '../../models/player';
import Tables from '../../models/core';
import { BehaviorSubject } from 'rxjs';


const supabaseUrl = environment.supabaseUrl;
const supabaseKey = environment.supabaseKey;
const supabase = createClient(supabaseUrl, supabaseKey)


@Injectable({
  providedIn: 'root'
})

export class Supabase {
  private playersSubject = new BehaviorSubject<Player[]>([]);
  players$ = this.playersSubject.asObservable();



  async insertPlayer(player: Player): Promise<boolean> {
    const { data, error } = await supabase.from("player").insert(player).select();
    if(data) this.playersSubject.next([...this.playersSubject.value, data[0]]);
    return !error
  }

  async getPlayers(): Promise<Player[] | null>  {
    const { data: player, error } = await supabase.from("player").select('*')
    this.playersSubject.next(player ?? []);
    return player
  }

  


  //PARA ASIGNAR PESOS FINALES
  async addEndWeigthByPlayerId(tabla: Tables){
    const { data: player, error } = await supabase.from(tabla).select('*')
    return player
  }

  //PARA ASIGNAR VOTOS A LOS JUGADORES
  async addVoteByPlayerId(tabla: Tables){
    const { data: player, error } = await supabase.from(tabla).select('*')
    return player
  }
}
