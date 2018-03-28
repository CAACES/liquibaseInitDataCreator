import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TheObject } from './the-object.model';
import { TheObjectService } from './the-object.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-the-object',
    templateUrl: './the-object.component.html'
})
export class TheObjectComponent implements OnInit, OnDestroy {
theObjects: TheObject[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private theObjectService: TheObjectService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.theObjectService.query().subscribe(
            (res: HttpResponse<TheObject[]>) => {
                this.theObjects = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTheObjects();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TheObject) {
        return item.id;
    }
    registerChangeInTheObjects() {
        this.eventSubscriber = this.eventManager.subscribe('theObjectListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
