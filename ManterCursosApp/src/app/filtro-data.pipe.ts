import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroData'
})

export class FiltroDataPipe implements PipeTransform {

  transform(row: any, f1: Date, f2?: Date): any {

    const resultadoFiltro = [];
    let date1 = Date.parse(formatDate(f1, 'yyyy-MM-dd', 'en-US'));
    let date2 = Date.parse(formatDate(f2, 'yyyy-MM-dd', 'en-US'));
    // si es menor a la fecha final
    if ( f1 == null && f2 == null) {
      return row;
    }
    // si el argumento de fecha final es invalido, se setea a la fecha actual
    if (f2 == null) {
      f2 = new Date();
    }
    // si ambos arreglos son correctos entonces se crea el nuevo arrego
    for (const filteredRow of row) {
      let a = Date.parse(formatDate(filteredRow.dataInicio, 'yyyy-MM-dd', 'en-US'));
      let b = Date.parse(formatDate(filteredRow.dataTermino, 'yyyy-MM-dd', 'en-US'));
      console.log(a);

      if ((a >= date1 && a <= date2 ) || (b >= date1 && b <= date2 )){

        console.log("asd", filteredRow);
        resultadoFiltro.push(filteredRow);
      }
    }
    return resultadoFiltro;
  }
}