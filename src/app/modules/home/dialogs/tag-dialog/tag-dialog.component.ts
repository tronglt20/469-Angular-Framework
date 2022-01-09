import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from 'src/app/modules/shared/services/shared.services';
import { TagModel } from '../../models/tag.model';

@Component({
  selector: 'tag-dialog',
  templateUrl: './tag-dialog.component.html',
  styleUrls: ['./tag-dialog.component.css'],
})
export class TagDialog implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TagDialog>,
    private service: SharedService
  ) {}

  ngOnInit(): void {
    this.loadTagList();
  }

  busId = this.data.id;
  tagList: TagModel[]

  addTag(name: string){
    name = name.trim()
    if(!name) return;
    this.service.post<TagModel>(`project/${this.busId}/tags`, `"${name}"`).subscribe(
      result => this.loadTagList()
    )
  }

  loadTagList(){
    this.service.getAll<TagModel>(`project/${this.busId}/tags`).subscribe(
      data => this.tagList = data
    )
  }

  deleteTag(tagId: number){
    this.service.delete<TagModel>(`tags/${tagId}`).subscribe(result => this.loadTagList())
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
