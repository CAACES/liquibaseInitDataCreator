import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TheClass } from './the-class.model';
import { TheClassPopupService } from './the-class-popup.service';
import { TheClassService } from './the-class.service';

@Component({
    selector: 'jhi-the-class-delete-dialog',
    templateUrl: './the-class-delete-dialog.component.html'
})
export class TheClassDeleteDialogComponent {

    theClass: TheClass;

    constructor(
        private theClassService: TheClassService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.theClassService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'theClassListModification',
                content: 'Deleted an theClass'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-the-class-delete-popup',
    template: ''
})
export class TheClassDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private theClassPopupService: TheClassPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.theClassPopupService
                .open(TheClassDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
