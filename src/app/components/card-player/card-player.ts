import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import Player from '../../models/player';
@Component({
  selector: 'app-card-player',
  imports: [MatCardModule, MatButtonModule, MatBadgeModule, MatIconModule],
  templateUrl: './card-player.html',
  styleUrl: './card-player.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPlayer {
  @Input() names: string = "";
  @Input() ocupation: string = "";
  @Input() weigth_start: number = 0;
  @Input() weigth_end: number = 0;
  @Input() votes: number = 0;
}
