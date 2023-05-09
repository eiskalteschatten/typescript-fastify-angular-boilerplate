import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

const sharedMaterialModules = [
  MatToolbarModule,
  MatButtonModule
];

@NgModule({
  declarations: [],
  imports: sharedMaterialModules,
  exports: sharedMaterialModules,
})
export class SharedMaterialModule { }
