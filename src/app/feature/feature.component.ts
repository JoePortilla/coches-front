import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.css'
})
export class FeatureComponent {

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    //this.router.navigateByUrl("/portafolio").then();
  }

}
