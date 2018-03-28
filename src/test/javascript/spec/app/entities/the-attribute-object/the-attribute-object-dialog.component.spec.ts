/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LiquibaseInitDataCreatorTestModule } from '../../../test.module';
import { TheAttributeObjectDialogComponent } from '../../../../../../main/webapp/app/entities/the-attribute-object/the-attribute-object-dialog.component';
import { TheAttributeObjectService } from '../../../../../../main/webapp/app/entities/the-attribute-object/the-attribute-object.service';
import { TheAttributeObject } from '../../../../../../main/webapp/app/entities/the-attribute-object/the-attribute-object.model';
import { TheObjectService } from '../../../../../../main/webapp/app/entities/the-object';
import { TheAttributeService } from '../../../../../../main/webapp/app/entities/the-attribute';

describe('Component Tests', () => {

    describe('TheAttributeObject Management Dialog Component', () => {
        let comp: TheAttributeObjectDialogComponent;
        let fixture: ComponentFixture<TheAttributeObjectDialogComponent>;
        let service: TheAttributeObjectService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LiquibaseInitDataCreatorTestModule],
                declarations: [TheAttributeObjectDialogComponent],
                providers: [
                    TheObjectService,
                    TheAttributeService,
                    TheAttributeObjectService
                ]
            })
            .overrideTemplate(TheAttributeObjectDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TheAttributeObjectDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TheAttributeObjectService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TheAttributeObject(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.theAttributeObject = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'theAttributeObjectListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TheAttributeObject();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.theAttributeObject = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'theAttributeObjectListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
