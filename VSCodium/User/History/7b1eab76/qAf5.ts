import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContactanosComponent} from'./componentes/contactanos/contactanos.component';
const routes: Routes = [
  {path:'contactanos', component: }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
