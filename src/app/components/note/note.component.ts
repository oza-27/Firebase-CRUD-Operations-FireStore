import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from 'src/app/note';
import { FirebaseService } from 'src/app/services/firebase.service';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  noteDetails:any;
  noteData:any = [];
  editForm!:FormGroup;
  notOldData!: Note;
  notObj: Note = {
    id: '',
    noteTitle: '',
    noteDesc: ''
  }
  notForm!: FormGroup
  constructor(private fb:FormBuilder, private noteService:NoteService, private auth:FirebaseService) 
  { 
    this.notForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required]
    });
    this.editForm = this.fb.group({
      edit_title: [null, Validators.required],
      edit_description: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAll() 
  } 
  addNote(){
    const {value} = this.notForm
    console.log(value);
    this.notObj.id = '',
    this.notObj.noteTitle = value.title,
    this.notObj.noteDesc = value.description

    this.noteService.addNote(this.notObj).then((note) => {
      if(note){
        alert("Data added successfully:")
        this.notForm.reset() 
      }
    })
  }

  // getting list of data
  getAll(){
    this.noteService.getAll().subscribe((res:Note[]) =>{
      console.log(res);
      this.noteData = res
    });
  }

  // deleting data
  deleteNote(note:Note){
    let decision = confirm("You sure want to delete?")
    if(decision == true){
      this.noteService.deleteNote(note);
    }
  }

   
  // showing data in modal
  updateNote(note:Note){
    this.editForm.patchValue({
      "edit_title":note.noteTitle,
      "edit_description":note.noteDesc
    })
    this.notOldData = note;
  }

  // updating data
  editNote(){
    const {value} = this.editForm;
    this.notObj.id = '',
    this.notObj.noteTitle = value.edit_title,
    this.notObj.noteDesc = value.edit_description;

    this.noteService.updateNote(this.notOldData, this.notObj).then((note) =>{
      alert("Data Updated successfully")
    })
    this.editForm.reset()
  }

  logout(){
    this.auth.logout()
  }
}
