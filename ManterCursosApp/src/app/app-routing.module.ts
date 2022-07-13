import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarCursosComponent } from './cursos/mostrar-cursos.component';
import { LogsComponent } from './logs/logs.component';

const routes: Routes = [
  {path:'cursos', component: MostrarCursosComponent},
  {path:'logs', component: LogsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
