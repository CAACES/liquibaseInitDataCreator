/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LiquibaseInitDataCreatorTestModule } from '../../../test.module';
import { TheObjectDetailComponent } from '../../../../../../main/webapp/app/entities/the-object/the-object-detail.component';
import { TheObjectService } from '../../../../../../main/webapp/app/entities/the-object/the-object.service';
import { TheObject } from '../../../../../../main/webapp/app/entities/the-object/the-object.model';

describe('Component Tests', () => {

    describe('TheObject Management Detail Component', () => {
        let comp: TheObjectDetailComponent;
        let fixture: ComponentFixture<TheObjectDetailComponent>;
        let service: TheObjectService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LiquibaseInitDataCreatorTestModule],
                declarations: [TheObjectDetailComponent],
                providers: [
                    TheObjectService
                ]
            })
            .overrideTemplate(TheObjectDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TheObjectDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TheObjectService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TheObject(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.theObject).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
