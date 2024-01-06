import {Component} from '@angular/core';
import {TokenService} from "../../../../core/services/token.service";

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrl: './header-nav.component.css'
})
export class HeaderNavComponent {
  public nameUser: string;

  public emailUser: string;

  public role: string;

  constructor(private tokenService: TokenService) {
  }

  /**
   * Deconstruction of JWT
   */
  ngOnInit() {
    this.nameUser = this.tokenService.getInfoToken().fullname;
    this.emailUser = this.tokenService.getInfoToken().email;
    this.role = this.tokenService.getInfoToken().rol;
  }

}
