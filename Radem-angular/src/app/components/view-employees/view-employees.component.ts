import { Component, OnInit } from '@angular/core';
import { EmployeService } from 'src/app/services/employe.service';
import { Employe } from './../../services/class/employe';
import * as XLSX from 'xlsx';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.css']
})
export class ViewEmployeesComponent implements OnInit {
  Employes: any[] = [];

  error: string | null = null;
  filterActive: boolean = false;
  page = 1;
  pageSize = 5;
  isLoading = false;


  constructor(private api: EmployeService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
  this.isLoading = true;

  this.api.getEmployes().subscribe(
    (data: Employe[]) => {

      this.Employes = data.filter(item => item.id !== "0" && item.id !== null && item.id !== "" &&
      item.Department !== undefined && item.last_attendance_time !== undefined);
      console.log("This is the list of employees", this.Employes);
      this.filterActive = false;
      this.isLoading = false;
    },
    (error: any) => {
      console.error(error);
      this.error = 'An error occurred while fetching data.';
      this.isLoading = false;
    }
  );
}




  isToday(dateString: string): boolean {
    if (!dateString) {
      return false;
    }

    const today = new Date().toISOString().split('T')[0];
    return dateString.startsWith(today);
  }



  toggleFilterState() {
    this.filterActive = !this.filterActive;
    if (this.filterActive) {
      this.filterPresent();
    } else {
      this.getAll();
    }
  }

  filterPresent() {
    const today = new Date().toISOString().split('T')[0];
    this.Employes = this.Employes.filter(employe => employe.last_attendance_time.startsWith(today));
  }

  deleteEmploye(id: string) {
    if (window.confirm('Are you sure you want to delete this item?')) {
      this.isLoading = true;

      this.api.deleteEmploye(id).subscribe(
        () => {
          console.log(`Employee with ID ${id} deleted successfully.`);
          this.getAll();
          this.isLoading = false;
        },
        (error) => {
          console.error('Error deleting employee:', error);
          this.isLoading = false;
        }
      );
    }
  }

exportToExcel() {

  const currentDate = new Date().toLocaleDateString('en-US');
  this.Employes.forEach((employe) => {
    const lastAttendanceTime = new Date(employe.last_attendance_time);

    if (lastAttendanceTime.toLocaleDateString('en-US') === currentDate) {
      if (lastAttendanceTime.getHours() >= 9 && lastAttendanceTime.getMinutes() >= 0) {
        employe.status = 'En retard';
      } else {
        employe.status = 'Present';
      }
    } else {
      employe.status = 'Absent';
    }
  });


  const filteredData = this.Employes.filter((employe) =>
    employe.status === 'Present' || employe.status === 'En retard' || employe.status === 'Absent'
  );


  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);


  const workbook: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');


  const arrayBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' as 'string' });
  const blob = new Blob([arrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'employee_data.xlsx';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}





}
