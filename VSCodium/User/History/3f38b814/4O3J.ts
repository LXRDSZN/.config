import { Component,Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { constructor } from 'jasmine';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'exposicion_web';
}

constructor(private renderer:Renderer2, private router: Router ){}
