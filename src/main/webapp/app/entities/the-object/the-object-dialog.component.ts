import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TheObject } from './the-object.model';
import { TheObjectPopupService } from './the-object-popup.service';
import { TheObjectService } from './the-object.service';
import { TheClass, TheClassService } from '../the-class';

@Component({
    selector: 'jhi-the-object-dialog',
    templateUrl: './the-object-dialog.component.html'
})
export class TheObjectDialogComponent implements OnInit {

    theObject: TheObject;
    isSaving: boolean;

    theclasses: TheClass[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private theObjectService: TheObjectService,
        private theClassService: TheClassService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.theClassService.query()
            .subscribe((res: HttpResponse<TheClass[]>) => { this.theclasses = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.theObject.id !== undefined) {
            this.subscribeToSaveResponse(
                this.theObjectService.update(this.theObject));
        } else {
            this.subscribeToSaveResponse(
                this.theObjectService.create(this.theObject));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TheObject>>) {
        result.subscribe((res: HttpResponse<TheObject>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TheObject) {
        this.eventManager.broadcast({ name: 'theObjectListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTheClassById(index: number, item: TheClass) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-the-object-popup',
    template: ''
})
export class TheObjectPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private theObjectPopupService: TheObjectPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.theObjectPopupService
                    .open(TheObjectDialogComponent as Component, params['id']);
            } else {
                this.theObjectPopupService
                    .open(TheObjectDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
