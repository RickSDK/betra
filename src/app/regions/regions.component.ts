import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss']
})
export class RegionsComponent extends BaseComponent implements OnInit {
  public regionIdx = 0;
  public regions = [
    {
      name: 'NW', number: 0, divisions: [
        {
          name: 1, zones: [
            { name: 1, areas: ['Washington'] },
            { name: 2, areas: ['Oregon', 'Idaho'] },
            { name: 3, areas: ['Alaska', 'Montana', 'South Dakota', 'North Dakota'] },
          ]
        },
        {
          name: 2, zones: [
            { name: 1, areas: ['Kansas', 'Nebraska', 'Utah'] },
            { name: 2, areas: ['Wyoming', 'Colorado'] },
            { name: 3, areas: ['Oklahoma', 'Arkansas'] },
          ]
        },
        {
          name: 3, zones: [
            { name: 1, areas: ['Wisconsin'] },
            { name: 2, areas: ['Minnesota'] },
            { name: 3, areas: ['Iowa', 'Missouri'] },
          ]
        },
        {
          name: 4, zones: [
            { name: 1, areas: ['Illinois'] },
            { name: 2, areas: ['Indiana'] },
            { name: 3, areas: ['Chicago'] },
          ]
        },
      ]
    },
    {
      name: 'SW', number: 1, divisions: [
        {
          name: 1, zones: [
            { name: 1, areas: ['N. California'] },
            { name: 2, areas: ['Nevada'] },
            { name: 3, areas: ['Hawaii'] },
          ]
        },
        {
          name: 2, zones: [
            { name: 1, areas: ['N Texas'] },
            { name: 2, areas: ['Arizona'] },
            { name: 3, areas: ['S Texas'] },
          ]
        },
        {
          name: 3, zones: [
            { name: 1, areas: ['S California'] },
            { name: 2, areas: ['Los Angelos'] },
            { name: 3, areas: ['New Mexico'] },
          ]
        },
        {
          name: 4, zones: [
            { name: 1, areas: ['International'] },
            { name: 2, areas: ['International'] },
            { name: 3, areas: ['International'] },
          ]
        },
      ]
    },
    {
      name: 'NE', number: 2, divisions: [
        {
          name: 1, zones: [
            { name: 1, areas: ['Massachusetts', 'Vermont'] },
            { name: 2, areas: ['Maine', 'Rhode Island', 'Connecticut'] },
            { name: 3, areas: ['New Hampshire', 'Maryland'] },
          ]
        },
        {
          name: 2, zones: [
            { name: 1, areas: ['Delaware'] },
            { name: 2, areas: ['New Jersey'] },
            { name: 3, areas: ['Pennsylvania'] },
          ]
        },
        {
          name: 3, zones: [
            { name: 1, areas: ['N. Ohio'] },
            { name: 2, areas: ['S. Ohio'] },
            { name: 3, areas: ['Michigan'] },
          ]
        },
        {
          name: 4, zones: [
            { name: 1, areas: ['N. New York'] },
            { name: 2, areas: ['C. New York'] },
            { name: 3, areas: ['New York City'] },
          ]
        },
      ]
    },
    {
      name: 'SE', number: 3, divisions: [
        {
          name: 1, zones: [
            { name: 1, areas: ['Georgia'] },
            { name: 2, areas: ['Louisiana', 'Mississippi'] },
            { name: 3, areas: ['Alabama'] },
          ]
        },
        {
          name: 2, zones: [
            { name: 1, areas: ['Virginia'] },
            { name: 2, areas: ['Tennessee'] },
            { name: 3, areas: ['Kentucky', 'West Virginia'] },
          ]
        },
        {
          name: 3, zones: [
            { name: 1, areas: ['North Carolina'] },
            { name: 2, areas: ['South Carolina'] },
            { name: 3, areas: ['Florida'] },
          ]
        },
        {
          name: 4, zones: [
            { name: 1, areas: ['International (N. India)'] },
            { name: 2, areas: ['International (C. India)'] },
            { name: 3, areas: ['International (S. India)'] },
          ]
        },
      ]
    },
  ];

  constructor() { super(); }

  ngClassButton(num1: number, num2: number) {
    if (num1 == num2)
      return 'btn btn-primary';
    else
      return 'btn btn-light';
  }
}
