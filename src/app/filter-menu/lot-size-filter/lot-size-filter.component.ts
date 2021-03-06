import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FilterTypeConstants, HouseListTypes, ListTypeConstants, NoOfBathList} from '../filter.constants';
import {ICommonFilter} from '../common-filter.interface';

declare var jQuery: any;

@Component({
  selector: 'icity-lot-size-filter',
  templateUrl: './lot-size-filter.component.html',
  styleUrls: ['../filter-menu.component.css', './lot-size-filter.component.css']
})
export class LotSizeFilterComponent implements OnInit, ICommonFilter {
  filterType: string;
  filterValue: string[];
  filterLabel: string = 'Filters';
  houseListTypes = HouseListTypes;
  listTypeConstants = ListTypeConstants;
  noOfBaths = NoOfBathList;

  constructor() {
    this.filterType = FilterTypeConstants.NO_OF_BATHS;
  }

  @Input()
  setValue(value: any) {
    if (!value) {
      return;
    }
    this.filterValue = value;
    this.renderValue();
  }

  getValue(): any {
    return this.filterValue;
  }

  @Output()
  valueChanged: EventEmitter<{ filterType: string, filterValue: any }> = new EventEmitter<{ filterType: string, filterValue: any }>();

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      jQuery('select').select2({
        minimumResultsForSearch: Infinity
      });
    }, 0);
  }

  renderValue() {
    if (!this.filterValue) {
      return;
    }
  }

  updateFilterValue() {
    let value = [];
    this.filterValue = value;
    this.valueChanged.emit({filterType: this.filterType, filterValue: this.filterValue});
    return value;
  }

  updateFilterLabel() {
    let selectedTypes = 0;
    this.filterLabel = 'Listing Type';
    for (let i = 0; this.houseListTypes && i < this.houseListTypes.length; i++) {
      if (this.houseListTypes[i].type['isSelected']) {
        selectedTypes++;
        if (selectedTypes == 1) {
          this.filterLabel = this.houseListTypes[i].type.label;
        } else {
          this.filterLabel = 'Listing Type';
        }
      }
    }
  }
}
