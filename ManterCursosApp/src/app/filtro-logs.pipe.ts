import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroLogs'
})

export class FiltroLogsPipe implements PipeTransform {
  
  transform(row: any, f1: Date, f2?: Date): any {
    
    const resultadoFiltro = [];
    let date1 = Date.parse(formatDate(f1, 'yyyy-MM-dd', 'en-US'));
    let date2 = Date.parse(formatDate(f2, 'yyyy-MM-dd', 'en-US'));
    if ( f1 == null && f2 == null) {
      return row;
    }
    if (f2 == null) {
      f2 = new Date();
    }
    for (const filteredRow of row) {
      let a = Date.parse(formatDate(filteredRow.timestamp, 'yyyy-MM-dd', 'en-US'));
      console.log(a);

      if (a >= date1 && a <= date2 ){
        resultadoFiltro.push(filteredRow);
      }
    }
    return resultadoFiltro;
  }
}