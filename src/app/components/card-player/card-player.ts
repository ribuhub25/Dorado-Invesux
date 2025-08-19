import { ChangeDetectionStrategy, Component, inject, Input, model, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { PlayerService } from '../../services/player/player';
import { VoteService } from '../../services/vote/vote';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import Votation from '../../models/votation';

export interface DialogData {
  winner_id: number;
  winner_name: string;
}

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
  @Input() id: number = 0;

  private _playerService = inject(PlayerService);
  private _votationService = inject(VoteService);
  
  readonly dialog = inject(MatDialog);
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogVotePlayer,{
      data: {
        winner_id: this.id,
        winner_name: this.names
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      //ACTUALIZA CADA VEZ QUE SE EMITE UN VOTO
      this._votationService.count$.subscribe(data => {
        this.votes = data;
      });
    });
  }

}

@Component({
  selector: 'dialog-vote-player',
  templateUrl: 'dialog-vote-player.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogVotePlayer implements OnInit{
  readonly dialogRef = inject(MatDialogRef<DialogVotePlayer>);
  private readonly _votationService = inject(VoteService);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly winnerId = this.data.winner_id;
  readonly winnerName = this.data.winner_name;
  public form!: FormGroup;
  constructor(
    private fb: FormBuilder
  ) {}
  
  ngOnInit(): void {
    this.form = this.fb.group({
      name: "",
      weigth: 0,
      winner: this.winnerId,
      cost: 0
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async insertVote(){
    var data: Votation = this.form.value;
    var response = await this._votationService.insertVote(this.form.value);
    if(response) this.dialogRef.close();
  }
}