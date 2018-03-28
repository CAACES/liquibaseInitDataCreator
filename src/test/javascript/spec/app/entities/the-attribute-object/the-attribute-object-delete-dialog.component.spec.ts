/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LiquibaseInitDataCreatorTestModule } from '../../../test.module';
import { TheAttributeObjectDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/the-attribute-object/the-attribute-object-delete-dialog.component';
import { TheAttributeObjectService } from '../../../../../../main/webapp/app/entities/the-attribute-object/the-attribute-object.service';

describe('Component Tests', () => {

    describe('TheAttributeObject Management Delete Component', () => {
        let comp: TheAttributeObjectDeleteDialogComponent;
        let fixture: ComponentFixture<TheAttributeObjectDeleteDialogComponent>;
        let service: TheAttributeObjectService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LiquibaseInitDataCreatorTestModule],
                declarations: [TheAttributeObjectDeleteDialogComponent],
                providers: [
                    TheAttributeObjectService
                ]
            })
            .overrideTemplate(TheAttributeObjectDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TheAttributeObjectDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TheAttributeObjectService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
