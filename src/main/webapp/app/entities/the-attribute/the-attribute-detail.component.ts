import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TheAttribute } from './the-attribute.model';
import { TheAttributeService } from './the-attribute.service';

@Component({
    selector: 'jhi-the-attribute-detail',
    templateUrl: './the-attribute-detail.component.html'
})
export class TheAttributeDetailComponent implements OnInit, OnDestroy {

    theAttribute: TheAttribute;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private theAttributeService: TheAttributeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTheAttributes();
    }

    load(id) {
        this.theAttributeService.find(id)
            .subscribe((theAttributeResponse: HttpResponse<TheAttribute>) => {
                this.theAttribute = theAttributeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTheAttributes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'theAttributeListModification',
            (response) => this.load(this.theAttribute.id)
        );
    }
}
