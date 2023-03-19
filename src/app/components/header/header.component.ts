import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public isActive = false;
  public isConteiner = false;
  showModel(): void {
    this.isActive = !this.isActive;
    if (this.isActive) {
      this.isConteiner = true;
    } else {
      this.isConteiner = false;
    }
  }
}
