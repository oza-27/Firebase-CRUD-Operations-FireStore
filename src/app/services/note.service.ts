import { Note } from 'src/app/note';
import { Injectable } from '@angular/core';
import { addDoc, Firestore, doc, collectionData } from '@angular/fire/firestore';
import { collection, deleteDoc, updateDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NoteService {
  
  constructor(private fs:Firestore) { }

  // Adding a new Note
  addNote(note:Note){
    note.id = doc(collection(this.fs, 'id')).id
    return addDoc(collection(this.fs, 'Notes'),note)
  }

  // Get Notes
  getAll():Observable<Note[]>{
    let noteRef = collection(this.fs, 'Notes')
    return collectionData(noteRef, {idField:'id'}) as Observable<Note[]>
  }

  deleteNote(note:Note){
    let docRef = doc(this.fs, `Notes/${note.id}`);
    return deleteDoc(docRef);
  }

  // update note
  updateNote(note:Note, notes:any){
    let docRef = doc(this.fs, `Notes/${note.id}`);
    return updateDoc(docRef, notes)
  }
}
  