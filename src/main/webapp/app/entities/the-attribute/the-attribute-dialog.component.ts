import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TheAttribute } from './the-attribute.model';
import { TheAttributePopupService } from './the-attribute-popup.service';
import { TheAttributeService } from './the-attribute.service';
import { TheClass, TheClassService } from '../the-class';

@Component({
    selector: 'jhi-the-attribute-dialog',
    templateUrl: './the-attribute-dialog.component.html'
})
export class TheAttributeDialogComponent implements OnInit {

    theAttribute: TheAttribute;
    isSaving: boolean;

    theclasses: TheClass[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private theAttributeService: TheAttributeService,
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
        if (this.theAttribute.id !== undefined) {
            this.subscribeToSaveResponse(
                this.theAttributeService.update(this.theAttribute));
        } else {
            this.subscribeToSaveResponse(
                this.theAttributeService.create(this.theAttribute));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TheAttribute>>) {
        result.subscribe((res: HttpResponse<TheAttribute>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TheAttribute) {
        this.eventManager.broadcast({ name: 'theAttributeListModification', content: 'OK'});
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
    selector: 'jhi-the-attribute-popup',
    template: ''
})
export class TheAttributePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private theAttributePopupService: TheAttributePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.theAttributePopupService
                    .open(TheAttributeDialogComponent as Component, params['id']);
            } else {
                this.theAttributePopupService
                    .open(TheAttributeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
