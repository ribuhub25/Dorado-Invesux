import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SupabaseService } from '../supabase/supabase';
import Votation from '../../models/votation';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  private votationsSubject = new BehaviorSubject<Votation[]>([]);
  votation$ = this.votationsSubject.asObservable();
  constructor(private _supabaseService: SupabaseService) {}

  async insertVote(votation: Votation): Promise<boolean> {
    const { data, error } = await this._supabaseService.supabase.from("votation").insert(votation).select();
    if(data) this.votationsSubject.next([...this.votationsSubject.value, data[0]]);
    return !error
  }

  async getVotes(): Promise<Votation[] | null>  {
    const { data: votation, error } = await this._supabaseService.supabase.from("votation").select('*')
    this.votationsSubject.next(votation ?? []);
    return votation
  }

}
