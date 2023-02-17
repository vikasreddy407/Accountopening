import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import { UpdateComponent } from './update/update.component';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { HomeModule } from './home/home.module';
import { CommonModule } from '@angular/common';
import { MyInterceptorInterceptor } from './my-interceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    // NewformComponent,
    // ConfirmComponent,
    // TasklistComponent,
    // TaskdetailsComponent,
    // DialogComponent,
    // ListdialogComponent,
    HeaderComponent,
    MenuComponent,
    LoginComponent
  ],  
  imports: [
     BrowserModule,
    HomeModule,   
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    FormsModule,
    MatDividerModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    ToastrModule.forRoot()   
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MyInterceptorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
