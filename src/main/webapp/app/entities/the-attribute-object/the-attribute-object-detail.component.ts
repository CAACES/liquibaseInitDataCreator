import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TheAttributeObject } from './the-attribute-object.model';
import { TheAttributeObjectService } from './the-attribute-object.service';

@Component({
    selector: 'jhi-the-attribute-object-detail',
    templateUrl: './the-attribute-object-detail.component.html'
})
export class TheAttributeObjectDetailComponent implements OnInit, OnDestroy {

    theAttributeObject: TheAttributeObject;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private theAttributeObjectService: TheAttributeObjectService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTheAttributeObjects();
    }

    load(id) {
        this.theAttributeObjectService.find(id)
            .subscribe((theAttributeObjectResponse: HttpResponse<TheAttributeObject>) => {
                this.theAttributeObject = theAttributeObjectResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTheAttributeObjects() {
        this.eventSubscriber = this.eventManager.subscribe(
            'theAttributeObjectListModification',
            (response) => this.load(this.theAttributeObject.id)
        );
    }
}
