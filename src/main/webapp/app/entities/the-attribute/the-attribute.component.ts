import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TheAttribute } from './the-attribute.model';
import { TheAttributeService } from './the-attribute.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-the-attribute',
    templateUrl: './the-attribute.component.html'
})
export class TheAttributeComponent implements OnInit, OnDestroy {
theAttributes: TheAttribute[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private theAttributeService: TheAttributeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.theAttributeService.query().subscribe(
            (res: HttpResponse<TheAttribute[]>) => {
                this.theAttributes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTheAttributes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TheAttribute) {
        return item.id;
    }
    registerChangeInTheAttributes() {
        this.eventSubscriber = this.eventManager.subscribe('theAttributeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
