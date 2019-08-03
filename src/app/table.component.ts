import { Component, Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Table, TableDescription } from '@ng-holistic/clr-list';
import { Subject, timer } from 'rxjs';
import { mapTo, startWith, withLatestFrom, map } from 'rxjs/operators';
/**
 * Scenario : API returns state column containing id of the state, the states
 * list is stored in redux like storage, we need display in table label of the state
 * not id. 
 */

// Provide table UI definition in js object
const definition : Table.Definition = {
    cols: [
        {
            id: 'title',
            title: 'Title'
        },
        {
            id: 'stateLabel',
            title: 'State'
        }
    ]
};

// Provide data for the table
const rows: Table.Row[] = [
    {
        id: '1',
        title: 'aaaa',
        state: 1
    },
    {
        id: '2',
        title: 'bbb',
        state: 2
    }
];


// emitates redux like storage
const states = [
  {id: 1, label: 'Success'},
  {id: 2, label: 'Fail'},
]
// suppose this is storage containing state 
const states$ = timer(2500).pipe(startWith([]), mapTo(states));

// Suppose this is service which loads data using http
@Injectable()
export class DataService {
    load(state) {
      return timer(1000).pipe(mapTo(rows));
    }
}

@Component({
  selector: 'my-table',
  template: '<hlc-clr-table [definition]="definition" [dataProvider]="dataProvider"></hlc-clr-table>',
  styleUrls: [ './table.component.scss' ],
  providers: [DatePipe]
})
export class TableComponent  {
  readonly definition: Table.Definition;
  readonly dataProvider: Table.Data.DataProvider;
  constructor(dataService: DataService) {
    this.definition = definition;
    this.dataProvider = {
      load(state) {
          // enrich data on load
          return dataService.load(state).pipe(
            withLatestFrom(states$), 
            map(([data, states]) => {
              return {
                rows: data.map(row => ({...row, stateLabel: states.find(s => s.id === row.state).label}))
              }
            }));
      }
    };

  }
}
