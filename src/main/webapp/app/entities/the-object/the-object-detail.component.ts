import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TheObject } from './the-object.model';
import { TheObjectService } from './the-object.service';

@Component({
    selector: 'jhi-the-object-detail',
    templateUrl: './the-object-detail.component.html'
})
export class TheObjectDetailComponent implements OnInit, OnDestroy {

    theObject: TheObject;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private theObjectService: TheObjectService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTheObjects();
    }

    load(id) {
        this.theObjectService.find(id)
            .subscribe((theObjectResponse: HttpResponse<TheObject>) => {
                this.theObject = theObjectResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTheObjects() {
        this.eventSubscriber = this.eventManager.subscribe(
            'theObjectListModification',
            (response) => this.load(this.theObject.id)
        );
    }
}
