import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TheClass } from './the-class.model';
import { TheClassService } from './the-class.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-the-class',
    templateUrl: './the-class.component.html'
})
export class TheClassComponent implements OnInit, OnDestroy {
theClasses: TheClass[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private theClassService: TheClassService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.theClassService.query().subscribe(
            (res: HttpResponse<TheClass[]>) => {
                this.theClasses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTheClasses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TheClass) {
        return item.id;
    }
    registerChangeInTheClasses() {
        this.eventSubscriber = this.eventManager.subscribe('theClassListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
