import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TheClass } from './the-class.model';
import { TheClassPopupService } from './the-class-popup.service';
import { TheClassService } from './the-class.service';

@Component({
    selector: 'jhi-the-class-dialog',
    templateUrl: './the-class-dialog.component.html'
})
export class TheClassDialogComponent implements OnInit {

    theClass: TheClass;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private theClassService: TheClassService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.theClass.id !== undefined) {
            this.subscribeToSaveResponse(
                this.theClassService.update(this.theClass));
        } else {
            this.subscribeToSaveResponse(
                this.theClassService.create(this.theClass));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TheClass>>) {
        result.subscribe((res: HttpResponse<TheClass>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TheClass) {
        this.eventManager.broadcast({ name: 'theClassListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-the-class-popup',
    template: ''
})
export class TheClassPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private theClassPopupService: TheClassPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.theClassPopupService
                    .open(TheClassDialogComponent as Component, params['id']);
            } else {
                this.theClassPopupService
                    .open(TheClassDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
