import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TheClass } from './the-class.model';
import { TheClassService } from './the-class.service';

@Component({
    selector: 'jhi-the-class-detail',
    templateUrl: './the-class-detail.component.html'
})
export class TheClassDetailComponent implements OnInit, OnDestroy {

    theClass: TheClass;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private theClassService: TheClassService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTheClasses();
    }

    load(id) {
        this.theClassService.find(id)
            .subscribe((theClassResponse: HttpResponse<TheClass>) => {
                this.theClass = theClassResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTheClasses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'theClassListModification',
            (response) => this.load(this.theClass.id)
        );
    }
}
