import { Component } from '@angular/core';
import { LoadingService } from 'src/app/core/services/loading.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxLoadingComponent } from 'ngx-loading';
import { LoadingConst } from 'src/app/core/constants/color-loading';

const PrimaryColor = LoadingConst.colorPrimary;
const SecondaryColor = LoadingConst.colorSecondary;

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  isVisible = false;
  public primaryColour = PrimaryColor;
  public secondaryColour = SecondaryColor;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  constructor(private loadinService: LoadingService) { }

  ngOnInit(): void {
    this.loadinService.isVisible$.subscribe(isVisible => {
      console.log(isVisible);
      this.isVisible = isVisible;
    });
  }
}
