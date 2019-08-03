import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TableComponent, DataService } from './table.component';
import { AppComponent } from './app.component';
import { TableDataProviderConfig, Table, TableCellFormatMap, HLC_CLR_TABLE_CELL_FORMAT_MAP } from '@ng-holistic/clr-list';
import { ClrDatagridStateInterface } from '@clr/angular';

import {
    HlcClrTableModule
} from '@ng-holistic/clr-list';

// CLARITY ICONS DEPENDENCY: THIS REQUIRED ONLY IN STACKBLITZ SEE #700
import '@clr/icons';
import '@clr/icons/shapes/all-shapes';
//


// In this sample app we don't use application domain or for this case
// condider dto model = application domain model
// TableDataProviderConfig is the adepter interface which helps map 
// data from application (dto in this case) model to list component model
const tableDataProviderConfig: TableDataProviderConfig = {
    mapState(state: ClrDatagridStateInterface): any {
      return {
        page: state.page.from / state.page.size + 1
      }
    },
    mapResult(result: any): Table.Data.Result{
       const pageIndex = 1;
       return {
         rows: result.results,
         paginator: {
           length: result.count,
           pageIndex,
           pageSize: 10
         }
       }  
    }                    
}


@NgModule({
  imports: [ BrowserModule, FormsModule, CommonModule, HlcClrTableModule.forRoot() ],
  declarations: [ AppComponent, TableComponent ],
  bootstrap:    [ AppComponent ],
  providers: [
        DataService
  ]
})
export class AppModule { }
