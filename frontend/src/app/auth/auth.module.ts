import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AuthMenuButtonComponent } from './auth-menu-button/auth-menu-button.component';
import { AuthMenuUserComponent } from './auth-menu-button/auth-menu-user/auth-menu-user.component';

import { ApiModule } from '../api/api.module';

const entryComponents = [AuthMenuUserComponent, AuthMenuButtonComponent];
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
export class AuthModule {}
