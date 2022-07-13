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
import { FiltroDataPipe } from './filtro-data.pipe';
import { LogsComponent } from './logs/logs.component';
import { FiltroLogsPipe } from './filtro-logs.pipe';


@NgModule({
  declarations: [
    AppComponent,
    CursosComponent,
    MostrarCursosComponent,
    AddEditCursosComponent,
    FiltroDataPipe,
    LogsComponent,
    FiltroLogsPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        progressBar: true
      }
    )

  ],
  providers: [HttpClientModule, CursosapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
