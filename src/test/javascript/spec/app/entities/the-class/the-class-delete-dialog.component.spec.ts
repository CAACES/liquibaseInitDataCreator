/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LiquibaseInitDataCreatorTestModule } from '../../../test.module';
import { TheClassDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/the-class/the-class-delete-dialog.component';
import { TheClassService } from '../../../../../../main/webapp/app/entities/the-class/the-class.service';

describe('Component Tests', () => {

    describe('TheClass Management Delete Component', () => {
        let comp: TheClassDeleteDialogComponent;
        let fixture: ComponentFixture<TheClassDeleteDialogComponent>;
        let service: TheClassService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LiquibaseInitDataCreatorTestModule],
                declarations: [TheClassDeleteDialogComponent],
                providers: [
                    TheClassService
                ]
            })
            .overrideTemplate(TheClassDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TheClassDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TheClassService);
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
