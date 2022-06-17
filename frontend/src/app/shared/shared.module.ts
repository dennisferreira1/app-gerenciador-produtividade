import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';

import { MatButtonModule } from '@angular/material/button';
import { SuccessDialogComponent } from './components/success-dialog/success-dialog.component';
import { SharedRoutingModule } from './shared-routing.module';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    ErrorDialogComponent,
    SuccessDialogComponent,
    DeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [
    ErrorDialogComponent,
    SuccessDialogComponent
  ]
})
export class SharedModule { }
