import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {



  constructor() { }

  firstName = new FormControl ('');
  lastName = new FormControl ('');
  contact = new FormControl ('');
  message = new FormControl ('');

  ngOnInit(): void {
  }


}

