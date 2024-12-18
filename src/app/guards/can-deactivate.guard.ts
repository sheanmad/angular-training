import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";

export interface CanComponenDeactivate{
  canDeactivate: () => boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<CanComponenDeactivate> {
  canDeactivate(component: CanComponenDeactivate):boolean{
    return component.canDeactivate ? component.canDeactivate() : true;
  }
};
