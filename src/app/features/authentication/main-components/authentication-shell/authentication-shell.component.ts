import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { LoginComponent } from '../../ui/login/login.component';
@Component({
  selector: 'app-authentication-shell',
  standalone: true,
  imports: [CommonModule, LoginComponent],
  templateUrl: './authentication-shell.component.html',
  styleUrl: './authentication-shell.component.scss'
})
export class AuthenticationShellComponent {

}
