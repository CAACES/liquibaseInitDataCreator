import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TheObject } from './the-object.model';
import { TheObjectPopupService } from './the-object-popup.service';
import { TheObjectService } from './the-object.service';

@Component({
    selector: 'jhi-the-object-delete-dialog',
    templateUrl: './the-object-delete-dialog.component.html'
})
export class TheObjectDeleteDialogComponent {

    theObject: TheObject;

    constructor(
        private theObjectService: TheObjectService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.theObjectService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'theObjectListModification',
                content: 'Deleted an theObject'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-the-object-delete-popup',
    template: ''
})
export class TheObjectDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private theObjectPopupService: TheObjectPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.theObjectPopupService
                .open(TheObjectDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
