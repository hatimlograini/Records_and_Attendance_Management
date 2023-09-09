import { Component } from '@angular/core';
import { Releve } from 'src/app/services/class/releve';
import { CrudService } from 'src/app/services/releve.service';
import * as XLSX from 'xlsx';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-view-releves',
  templateUrl: './view-releves.component.html',
  styleUrls: ['./view-releves.component.css']
})
export class ViewRelevesComponent {
  filteredReleves: any[] = [];
  searchCOD_RLR: string = '';
  searchDATE_REL: string = '';
  Releves: any[] = [];
  page = 1;
  pageSize = 5;
  isLoading = true;


  constructor(private crudAPI: CrudService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.isLoading = true; // Show loading spinner

    this.crudAPI.getReleves().subscribe(res => {
      console.log(res);
      this.Releves = res;
      this.applySearch();
      console.log(res);
      this.isLoading = false; // Hide loading spinner when data is received
    });
  }


  applySearch(): void {
    this.filteredReleves = this.Releves.filter((releve: Releve) =>
      releve.COD_RLR.toLowerCase().includes(this.searchCOD_RLR.toLowerCase()) &&
      releve.DATE_REL.toLowerCase().includes(this.searchDATE_REL.toLowerCase())
    );
  }

  exportToExcel(): void {
    const fileName = 'releves.xlsx';
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredReleves);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, fileName);
  }

  saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(data);
    downloadLink.download = fileName;
    downloadLink.click();
  }

  delete(id: any, i: any): void {
    console.log(id);
    if (window.confirm('Are you sure you want to delete this item?')) {
      this.crudAPI.deleteReleve(id).subscribe(res => {
        this.getAll();
      });
    }
  }
}
