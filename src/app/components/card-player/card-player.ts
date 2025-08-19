import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-card-player',
  imports: [MatCardModule, MatButtonModule, MatBadgeModule, MatIconModule],
  templateUrl: './card-player.html',
  styleUrl: './card-player.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPlayer {
  name = 'José Mimbela';
  occupation = 'Vendedor';
  weigth_initial = 0;
  weigth_final = 0;
  votes = 0;

}
