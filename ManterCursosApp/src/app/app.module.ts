import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CursosComponent } from './cursos/cursos.component';
import { MostrarCursosComponent } from './cursos/mostrar-cursos.component';
import { CursosapiService } from './cursosapi.service';
import { AddEditCursosComponent } from './cursos/add-edit-cursos.component';


@NgModule({
  declarations: [
    AppComponent,
    CursosComponent,
    MostrarCursosComponent,
    AddEditCursosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()

  ],
  providers: [HttpClientModule, CursosapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
