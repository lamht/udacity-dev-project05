import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AuthMenuButtonComponent } from './auth-menu-button/auth-menu-button.component';

import { ApiModule } from '../api/api.module';

const entryComponents = [AuthMenuButtonComponent];
const components = [...entryComponents];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ApiModule
  ],
  entryComponents: entryComponents,
  declarations: components,
  exports: components,
  providers: []
})
export class AuthMenuModule {}
