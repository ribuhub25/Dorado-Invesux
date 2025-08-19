import { ChangeDetectionStrategy, Component, inject, model, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from "@angular/material/card";
import Player, { Ocupation } from '../../models/player';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlayerService } from '../../services/player/player';
@Component({
  selector: 'app-navbar',
  imports: [MatIconModule, MatButtonModule, MatToolbarModule, MatCardModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Navbar {
  readonly dialog = inject(MatDialog);
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogNewPlayer);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

@Component({
  selector: 'dialog-new-player',
  templateUrl: 'dialog-new-player.html',
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
export class DialogNewPlayer implements OnInit{
  readonly dialogRef = inject(MatDialogRef<DialogNewPlayer>);
  private readonly _playerService = inject(PlayerService);
  public data = inject(MAT_DIALOG_DATA);
  public form!: FormGroup;
  
  constructor(
    private fb: FormBuilder
  ) {}
  
  ngOnInit(): void {
    this.form = this.fb.group({
      names: "",
      weigth_start: 0,
      ocupation: Ocupation.vendedor,
      votes: 0,
      weigth_end: 0
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async insertPlayer(){
    var data: Player = this.form.value;
    console.log(data);
    var response = await this._playerService.insertPlayer(this.form.value);
    if(response) this.dialogRef.close();
  }
}