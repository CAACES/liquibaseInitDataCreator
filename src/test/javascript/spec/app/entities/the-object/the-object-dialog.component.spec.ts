/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LiquibaseInitDataCreatorTestModule } from '../../../test.module';
import { TheObjectDialogComponent } from '../../../../../../main/webapp/app/entities/the-object/the-object-dialog.component';
import { TheObjectService } from '../../../../../../main/webapp/app/entities/the-object/the-object.service';
import { TheObject } from '../../../../../../main/webapp/app/entities/the-object/the-object.model';
import { TheClassService } from '../../../../../../main/webapp/app/entities/the-class';

describe('Component Tests', () => {

    describe('TheObject Management Dialog Component', () => {
        let comp: TheObjectDialogComponent;
        let fixture: ComponentFixture<TheObjectDialogComponent>;
        let service: TheObjectService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LiquibaseInitDataCreatorTestModule],
                declarations: [TheObjectDialogComponent],
                providers: [
                    TheClassService,
                    TheObjectService
                ]
            })
            .overrideTemplate(TheObjectDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TheObjectDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TheObjectService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TheObject(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.theObject = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'theObjectListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TheObject();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.theObject = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'theObjectListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
