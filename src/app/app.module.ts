import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TurkeysFormComponent } from './turkeys-form/turkeys-form.component';
import { TurkeyFormComponent } from './turkey-form/turkey-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TurkeyExampleComponent } from './turkey-example/turkey-example.component';

@NgModule({
  declarations: [AppComponent, TurkeysFormComponent, TurkeyFormComponent, TurkeyExampleComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
