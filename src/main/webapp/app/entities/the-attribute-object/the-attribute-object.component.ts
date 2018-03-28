import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TheAttributeObject } from './the-attribute-object.model';
import { TheAttributeObjectService } from './the-attribute-object.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-the-attribute-object',
    templateUrl: './the-attribute-object.component.html'
})
export class TheAttributeObjectComponent implements OnInit, OnDestroy {
theAttributeObjects: TheAttributeObject[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private theAttributeObjectService: TheAttributeObjectService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.theAttributeObjectService.query().subscribe(
            (res: HttpResponse<TheAttributeObject[]>) => {
                this.theAttributeObjects = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTheAttributeObjects();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TheAttributeObject) {
        return item.id;
    }
    registerChangeInTheAttributeObjects() {
        this.eventSubscriber = this.eventManager.subscribe('theAttributeObjectListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
