import {Directive, ElementRef, Input, Renderer2} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenService} from '../../systems/authen.service';

@Directive({
  selector: '[appCheckpermission]'
})
export class CheckpermissionDirective {

  // FunctionId of current element
  @Input() functionId: string;


  constructor(el: ElementRef, private router: Router, private  authenService: AuthenService, private renderer2: Renderer2) {
    el.nativeElement.style.color = 'Green';
    renderer2.setStyle(el.nativeElement, 'display', 'none');
  }

  // Get current path of component. Ex: /customertype
  getCurrentPath() {
    return this.router.url;
  }

}
