import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';
import { Order, UserFull } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-modal-m-page',
  templateUrl: './modal-m-page.component.html',
  styleUrls: ['./modal-m-page.component.css']
})
export class ModalMPageComponent implements OnInit, AfterViewInit {

   @Input() type: string    
   @Input() objectId: string 
  @ViewChild('modal') modalRef: ElementRef 
  modal: MaterialInstance
  form: FormGroup
  pending=false  
  user: UserFull
  
  constructor(private orderService: OrderService,
    private authService: AuthService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email:new FormControl([ Validators.email]),
      fullName:new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Zа-яА-Я ]*'), Validators.minLength(5)]),
      phone:new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('[0-9]*')]),
      description: new FormControl()
    });

    if(this.authService.isAuthenticated()){
      this.userService.getById(this.authService.userIdByToken()).subscribe(
        user => {         
          this.user=user})
    }

      }


      ngAfterViewInit(){      
        this.modal=MaterialService.initModal(this.modalRef) 
      }
  
      ngOnDestroy(){
        this.modal.destroy()       
      }
     
      addOrder(){ 
        if(this.user){
          this.form.reset({
            fullName: this.user.fullName,
            email: this.user.email,
            description: null,
            phone: this.user.phones[0]
          })
        }   else{
        this.form.reset({          
          description: null          
        })   }
        this.modal.open()
        MaterialService.updateTextInputs()
       
      }
    
      onCancel(){
        this.modal.close()
      }
    
      onSubmit(){    
        this.pending=true
        var clientId: string
        if(this.authService.isAuthenticated()){clientId=this.authService.userIdByToken()}        
        const newOrder: Order = {
          service:{
            type:this.type,
           objectId:this.objectId      
          },
          requestS:false,
          //dataClient:{
            name:this.form.value.fullName,
            phone:this.form.value.phone,
           email:this.form.value.email,
           description:this.form.value.description,
           clientId: clientId
          //}
        };    
        this.orderService.create(newOrder).subscribe(
          (newOrder) => {
            MaterialService.toats(`Заказ пользователя ${newOrder.name} был добавлен`);        
          },
          (error) => MaterialService.toats(error.error.message),
          () => {
            this.modal.close();
            this.pending=false
          }
        );
        
      }
    
  

}
