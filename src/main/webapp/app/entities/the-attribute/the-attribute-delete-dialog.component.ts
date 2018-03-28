import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TheAttribute } from './the-attribute.model';
import { TheAttributePopupService } from './the-attribute-popup.service';
import { TheAttributeService } from './the-attribute.service';

@Component({
    selector: 'jhi-the-attribute-delete-dialog',
    templateUrl: './the-attribute-delete-dialog.component.html'
})
export class TheAttributeDeleteDialogComponent {

    theAttribute: TheAttribute;

    constructor(
        private theAttributeService: TheAttributeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.theAttributeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'theAttributeListModification',
                content: 'Deleted an theAttribute'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-the-attribute-delete-popup',
    template: ''
})
export class TheAttributeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private theAttributePopupService: TheAttributePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.theAttributePopupService
                .open(TheAttributeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
