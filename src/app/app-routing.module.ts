import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CameraComponent } from './components/camera/camera.component';
import { UploadComponent } from './components/upload/upload.component';

// localhost:4200 => Camera Page
// localhost:4200/upload => Upload Content Page
const routes: Routes = [
  {path:'', component:CameraComponent},
  {path:'upload-page', component:UploadComponent},
  {path:'**', redirectTo:'/', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
