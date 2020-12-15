import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface DataTableItem {
  checked: boolean;
  No: number;
  SKU_Code: string;
  SKU_Name: string;
  Ex_RP : number;
  Ex_Max : number;
  Ex_Min_Order : number;
  New_ROP : number;
  New_Max: number;
  Per_Turns: number;
  Per_fillRate: string;
  Per_IP : number;
  Per_onHand: number;  
  eval : string; 
  Singal:number;
  
  
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DataTableItem[] = [
  { checked: false , No: 1, SKU_Code: 'SKU10001',SKU_Name:'Name-10001',Ex_RP:253,Ex_Max:100, Ex_Min_Order:100,  New_ROP : 300,New_Max: 400,Per_Turns: 4.0,Per_fillRate: "94.58%",Per_IP : 351,Per_onHand: 115,eval:"Yes",Singal:1},   
  {checked: false ,No: 2, SKU_Code: 'SKU10001',SKU_Name:'Name-10001',Ex_RP:253,Ex_Max:101, Ex_Min_Order:100,  New_ROP : 300,New_Max: 400,Per_Turns: 4.0,Per_fillRate: "94.58%",Per_IP : 351,Per_onHand: 115,eval:"Yes",Singal:2},   
  {checked: false,No: 3, SKU_Code: 'SKU10001',SKU_Name:'Name-10001',Ex_RP:253,Ex_Max:102, Ex_Min_Order:100,  New_ROP : 300,New_Max: 400,Per_Turns: 4.0,Per_fillRate: "94.58%",Per_IP : 351,Per_onHand: 115,eval:"Yes",Singal:1},   
  {checked: false,No: 4, SKU_Code: 'SKU10001',SKU_Name:'Name-10001',Ex_RP:253,Ex_Max:103, Ex_Min_Order:100,  New_ROP : 300,New_Max: 400,Per_Turns: 4.0,Per_fillRate: "94.58%",Per_IP : 351,Per_onHand: 115,eval:"Yes",Singal:1},   
  {checked: false,No: 5, SKU_Code: 'SKU10001',SKU_Name:'Name-10001',Ex_RP:253,Ex_Max:104, Ex_Min_Order:100,  New_ROP : 300,New_Max: 400,Per_Turns: 4.0,Per_fillRate: "94.58%",Per_IP : 351,Per_onHand: 115,eval:"Yes",Singal:2},   
  {checked: false,No: 6, SKU_Code: 'SKU10001',SKU_Name:'Name-10001',Ex_RP:253,Ex_Max:105, Ex_Min_Order:100,  New_ROP : 300,New_Max: 400,Per_Turns: 4.0,Per_fillRate: "94.58%",Per_IP : 351,Per_onHand: 115,eval:"Yes",Singal:1},   
  {checked: false,No: 7, SKU_Code: 'SKU10001',SKU_Name:'Name-10001',Ex_RP:253,Ex_Max:106, Ex_Min_Order:100,  New_ROP : 300,New_Max: 400,Per_Turns: 4.0,Per_fillRate: "94.58%",Per_IP : 351,Per_onHand: 115,eval:"Yes",Singal:3},   
  {checked: false,No: 8, SKU_Code: 'SKU10001',SKU_Name:'Name-10001',Ex_RP:253,Ex_Max:107, Ex_Min_Order:100,  New_ROP : 300,New_Max: 400,Per_Turns: 4.0,Per_fillRate: "94.58%",Per_IP : 351,Per_onHand: 115,eval:"Yes",Singal:1},   
  {checked: false,No: 9, SKU_Code: 'SKU10001',SKU_Name:'Name-10001',Ex_RP:253,Ex_Max:108, Ex_Min_Order:100,  New_ROP : 300,New_Max: 400,Per_Turns: 4.0,Per_fillRate: "94.58%",Per_IP : 351,Per_onHand: 115,eval:"Yes",Singal:1},   
  {checked: false,No: 10, SKU_Code: 'SKU10001',SKU_Name:'Name-10001',Ex_RP:253,Ex_Max:109, Ex_Min_Order:100,  New_ROP : 300,New_Max: 400,Per_Turns: 4.0,Per_fillRate: "94.58%",Per_IP : 351,Per_onHand: 115,eval:"Yes",Singal:3},   




];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<DataTableItem> {
  data: DataTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DataTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DataTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a. SKU_Code, b. SKU_Code, isAsc);
        case 'No': return compare(+a.No, +b.No, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
