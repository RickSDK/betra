import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../base/base.component';

declare var $: any;

@Component({
  selector: 'app-advanced-filters',
  templateUrl: './advanced-filters.component.html',
  styleUrls: ['./advanced-filters.component.scss']
})
export class AdvancedFiltersComponent extends BaseComponent implements OnInit {
  @Input('user') override user: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public genderTypes = ['Females', 'Males', 'All'];
  public gender = 'Females';
  public ageRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  public age = 4;
  public distanceOptions = ['Any', '10 miles', '50 miles', '100 miles'];
  public showLocationOptionsFlg: boolean = false;
  public loadingCountriesFlg: boolean = false;
  public loadingStatesFlg: boolean = false;
  public loadingCitiesFlg: boolean = false;
  public listOfCountries: any = [];
  public listOfStates: any = [];
  public listOfCities: any = [];
  public countrySelectDisabled = true;
  public stateSelectDisabled = true;
  public citySelectDisabled = true;
  public showStatesFlg = false;
  public showMoreOptionsFlg: boolean = false;
  public searchButtonPressedFlg: boolean = false;
  public religions = ['Christian', 'Jewish', 'Buddhist', 'Islamic', 'Atheist', 'None/Agnostic', 'Hindu', 'Sikh', 'Jainist', 'Taoist', 'Other Religion'];
  public raceOptions = ['White', 'Black', 'Asian', 'Pacific Islander', 'Native American', 'South-Asian', 'Hispanic', 'Middle Eastern', 'Other'];

  constructor() { super(); }

  override ngOnInit(): void {
    if (this.user.matchGender == 'M')
      this.gender = 'Males';
    if (this.user.matchGender == 'A')
      this.gender = 'All';

    this.listOfCountries.push(this.user.countryName);
    this.showStatesFlg = (this.user.countryName == 'United States');
    this.listOfStates.push(this.user.stateName);
    this.listOfCities.push('Any');
    this.listOfCities.push(this.user.city);
  }

  advancedSearchGo() {
    this.searchButtonPressedFlg = true;
    this.messageEvent.emit('search');
  }

  locationChanged() {
    var location = $('#location').val();
    if (location == 'Choose') {
      this.showLocationOptionsFlg = true;
      this.loadingCountriesFlg = true;
      this.citySelectDisabled = true;
      this.getDataFromServer('getAllCountries', 'findMatches.php', []);
    } else {
      this.showLocationOptionsFlg = false;
    }
  }

  override postSuccessApi(file: string, responseJson: any) {
    console.log('XXX postSuccessApi', file, responseJson);
    if (responseJson.action == 'getAllCountries') {
      this.loadingCountriesFlg = false;
      this.listOfCountries = responseJson.countryNames;
      this.listOfStates = responseJson.stateNames;
      this.countrySelectDisabled = false;
    }
    if (responseJson.action == 'getAllCitiesForCountry') {
      this.listOfCities = responseJson.cities;
      this.citySelectDisabled = false;
      this.loadingCitiesFlg = false;
    }
  }


  countryChanged() {
    var country = $('#country').val();
    console.log('xxx', country);
    this.showStatesFlg = (country == 'United States');
    this.loadingStatesFlg = true;
    this.listOfCities = [];
    if (this.user.countryName == country)
      this.listOfCities.push(this.user.city);
    this.stateChanged();
  }

  stateChanged() {
    var country = $('#country').val();
    var state = $('#state').val();
    console.log('xxxstateChanged', country, state);
    this.loadingCitiesFlg = true;
    this.getDataFromServer('getAllCitiesForCountry', 'findMatches.php', { 'country': country, 'state': state });
  }


}
