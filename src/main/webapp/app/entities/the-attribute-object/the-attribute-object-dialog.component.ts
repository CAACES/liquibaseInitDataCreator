import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TheAttributeObject } from './the-attribute-object.model';
import { TheAttributeObjectPopupService } from './the-attribute-object-popup.service';
import { TheAttributeObjectService } from './the-attribute-object.service';
import { TheObject, TheObjectService } from '../the-object';
import { TheAttribute, TheAttributeService } from '../the-attribute';

@Component({
    selector: 'jhi-the-attribute-object-dialog',
    templateUrl: './the-attribute-object-dialog.component.html'
})
export class TheAttributeObjectDialogComponent implements OnInit {

    theAttributeObject: TheAttributeObject;
    isSaving: boolean;

    theobjects: TheObject[];

    theattributes: TheAttribute[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private theAttributeObjectService: TheAttributeObjectService,
        private theObjectService: TheObjectService,
        private theAttributeService: TheAttributeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.theObjectService.query()
            .subscribe((res: HttpResponse<TheObject[]>) => { this.theobjects = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.theAttributeService.query()
            .subscribe((res: HttpResponse<TheAttribute[]>) => { this.theattributes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.theAttributeObject.id !== undefined) {
            this.subscribeToSaveResponse(
                this.theAttributeObjectService.update(this.theAttributeObject));
        } else {
            this.subscribeToSaveResponse(
                this.theAttributeObjectService.create(this.theAttributeObject));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TheAttributeObject>>) {
        result.subscribe((res: HttpResponse<TheAttributeObject>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TheAttributeObject) {
        this.eventManager.broadcast({ name: 'theAttributeObjectListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTheObjectById(index: number, item: TheObject) {
        return item.id;
    }

    trackTheAttributeById(index: number, item: TheAttribute) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-the-attribute-object-popup',
    template: ''
})
export class TheAttributeObjectPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private theAttributeObjectPopupService: TheAttributeObjectPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.theAttributeObjectPopupService
                    .open(TheAttributeObjectDialogComponent as Component, params['id']);
            } else {
                this.theAttributeObjectPopupService
                    .open(TheAttributeObjectDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
