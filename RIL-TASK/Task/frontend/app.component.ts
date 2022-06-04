import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TaskService } from './task.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'task';

  constructor(private service : TaskService) {}

  ngOnInit(): void {
    this.service.getAllContacts().subscribe((data) => {
      this.contacts = data;
    })
  }

//filtering contacts   
  contacts : any[] | undefined = undefined;
  
  search = new FormControl('');

  searchContacts(){
    if(this.search.value==""){
      this.service.getAllContacts().subscribe((data) =>{
        this.contacts = data;      
      })
    }
    else if(Number(this.search.value)==this.search.value){
      this.service.getContactsByNum(Number(this.search.value)).subscribe((data)=>{
        this.contacts = data;
        console.log(data);
      })
    }
    else{
      this.service.getContactByName(this.search.value).subscribe((data) =>{
        this.contacts = data;
      })
    }
  }
}

