import { ElementRef } from '@angular/core'

declare var M //переменная исскоствунная. М - это из materialize

export interface MaterialInstance{
    open?(): void
    close?(): void
    destroy?(): void
}
export interface MaterialDatepicker extends MaterialInstance{
    date?: Date
} 


export class MaterialService{
    static toats(message: string){
        M.toast({html: message})
    }

    static initializeFloatingButton(ref: ElementRef){
        M.FloatingActionButton.init(ref.nativeElement)
    }

  

    static updateTextInputs(){
        M.updateTextFields()
    }

    static initModal(ref: ElementRef): MaterialInstance{
     return   M.Modal.init(ref.nativeElement)
    }

    static initParallax(ref: ElementRef): MaterialInstance{        
        return  M.Parallax.init(ref.nativeElement)
       }
       static getParallaxInstance(ref: ElementRef){        
        return   M.Parallax.getInstance(ref.nativeElement)
       }


    static initSelect(ref: ElementRef){
        return  M.FormSelect.init(ref.nativeElement)
       }

       static initSection(ref: ElementRef){
        return  M.Collapsible.init(ref.nativeElement)
       }

    static getSelectElemet(ref: ElementRef){        
        return   M.FormSelect.getInstance(ref.nativeElement)
       }

       static initDatepicker(ref: ElementRef, onClose:()=>void){
        return M.Datepicker.init(ref.nativeElement,{
            format:'dd.mm.yyyy',
            showClearBtn:true,
            onClose
        })
    }
    static initTooltip(ref: ElementRef): MaterialInstance{
        return M.Tooltip.init(ref.nativeElement) 
    }
    static initTapTarget(ref: ElementRef): MaterialInstance {
        return M.TapTarget.init(ref.nativeElement)
      }
}