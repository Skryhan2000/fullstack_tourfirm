import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute  } from '@angular/router';
import { MaterialService } from '../shared/classes/material.service';
import { Transfer } from '../shared/interfaces';
import { TransferService } from '../shared/services/transfer.service';

@Component({
  selector: 'app-transfer-page',
  templateUrl: './transfer-page.component.html',
  styleUrls: ['./transfer-page.component.css']
})
export class TransferPageComponent implements OnInit {

  transfers: Transfer[]=[]
  transfer:Transfer
  transferId = null;
  form: FormGroup
  loading=false

  constructor(
    private transferService: TransferService
  ) { }

  ngOnInit(): void {
    this.form=new FormGroup({
      nameDirect:new FormControl(null, [Validators.required]),
      timeTo:new FormControl(null, [Validators.required]),
      timeFrom:new FormControl(null, [Validators.required])
    })
    
    this.form.disable()
    this.loading=true
    this.transferService.fetch().subscribe(transfers=>{
      this.transfers=transfers    
      this.loading=false
      })        
      this.form.enable()
  }

  onSelectTransfer( transfer: Transfer){    
    this.transferId=transfer._id         
    this.form.reset({
      nameDirect: transfer.nameDirect,
      timeTo: transfer.timeTo,
      timeFrom: transfer.timeFrom      
    })        
    MaterialService.updateTextInputs()    
  }

  onDeleteTransfer(event: Event, transfer: Transfer){
    event.stopPropagation();
    const decision = window.confirm(`Удалить трансфер "${transfer.nameDirect}"?`);

    if (decision) {
      this.transferService.delete(transfer).subscribe(
        (response) => {
          const idx = this.transfers.findIndex((p) => p._id === transfer._id);
          this.transfers.splice(idx, 1);
          MaterialService.toats(response.message);
        },
        (error) => MaterialService.toats(error.error.message)
      );
    }
  }

  onSubmit(){
    const newTransfer: Transfer = {
      nameDirect: this.form.value.nameDirect,
      timeTo: this.form.value.timeTo,
      timeFrom: this.form.value.timeFrom    
    }; 
    if (this.transferId) {
      newTransfer._id = this.transferId;
      this.transferId=null
      this.transferService.update(newTransfer).subscribe(
        (transfer) => {
          const idx = this.transfers.findIndex((p) => p._id === transfer._id);
          this.transfers[idx] = transfer;
          MaterialService.toats('Изменения сохранены');
        },
        (error) => MaterialService.toats(error.error.message) ,
      ()=>{this.form.reset({
        nameDirect: null,
        timeTo: null,
        timeFrom: null 
      })        
      MaterialService.updateTextInputs() 
    }      
      );
    } else {
      this.transferService.create(newTransfer).subscribe(
        (transfer) => {
          MaterialService.toats('Трансфер добавлен в систему');
          this.transfers.push(transfer);
        },
        (error) => MaterialService.toats(error.error.message),
        ()=>{this.form.reset({
          nameDirect: null,
          timeTo: null,
          timeFrom: null 
        })        
        MaterialService.updateTextInputs() 
      }
      );
    }
  }

}
