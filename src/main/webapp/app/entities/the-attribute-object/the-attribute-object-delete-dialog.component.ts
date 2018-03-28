import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TheAttributeObject } from './the-attribute-object.model';
import { TheAttributeObjectPopupService } from './the-attribute-object-popup.service';
import { TheAttributeObjectService } from './the-attribute-object.service';

@Component({
    selector: 'jhi-the-attribute-object-delete-dialog',
    templateUrl: './the-attribute-object-delete-dialog.component.html'
})
export class TheAttributeObjectDeleteDialogComponent {

    theAttributeObject: TheAttributeObject;

    constructor(
        private theAttributeObjectService: TheAttributeObjectService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.theAttributeObjectService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'theAttributeObjectListModification',
                content: 'Deleted an theAttributeObject'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-the-attribute-object-delete-popup',
    template: ''
})
export class TheAttributeObjectDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private theAttributeObjectPopupService: TheAttributeObjectPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.theAttributeObjectPopupService
                .open(TheAttributeObjectDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
