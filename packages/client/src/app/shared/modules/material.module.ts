import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

const sharedMaterialModules = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule
];

@NgModule({
  declarations: [],
  imports: sharedMaterialModules,
  exports: sharedMaterialModules,
})
export class SharedMaterialModule { }
