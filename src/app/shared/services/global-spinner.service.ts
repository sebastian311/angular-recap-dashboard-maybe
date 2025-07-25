import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalSpinnerService {
  private spinnerSubject$ = new BehaviorSubject<boolean>(false);

  showSpinner() {
    this.spinnerSubject$.next(true);
  }

  hideSpinner() {
    this.spinnerSubject$.next(false);
  }

  getSpinnerState() {
    return this.spinnerSubject$.asObservable();
  }
}
