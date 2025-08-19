import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js'
import { environment } from '../supabase/credentials';

@Injectable({
  providedIn: 'root'
})

export class SupabaseService {
  private supabaseUrl = environment.supabaseUrl;
  private supabaseKey = environment.supabaseKey;
  supabase = createClient(this.supabaseUrl, this.supabaseKey)
}
