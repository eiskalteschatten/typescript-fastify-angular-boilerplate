import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

const sharedMaterialModules = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule
];

@NgModule({
  declarations: [],
  imports: sharedMaterialModules,
  exports: sharedMaterialModules,
})
export class SharedMaterialModule { }
