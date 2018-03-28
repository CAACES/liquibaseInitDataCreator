/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LiquibaseInitDataCreatorTestModule } from '../../../test.module';
import { TheAttributeObjectDetailComponent } from '../../../../../../main/webapp/app/entities/the-attribute-object/the-attribute-object-detail.component';
import { TheAttributeObjectService } from '../../../../../../main/webapp/app/entities/the-attribute-object/the-attribute-object.service';
import { TheAttributeObject } from '../../../../../../main/webapp/app/entities/the-attribute-object/the-attribute-object.model';

describe('Component Tests', () => {

    describe('TheAttributeObject Management Detail Component', () => {
        let comp: TheAttributeObjectDetailComponent;
        let fixture: ComponentFixture<TheAttributeObjectDetailComponent>;
        let service: TheAttributeObjectService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LiquibaseInitDataCreatorTestModule],
                declarations: [TheAttributeObjectDetailComponent],
                providers: [
                    TheAttributeObjectService
                ]
            })
            .overrideTemplate(TheAttributeObjectDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TheAttributeObjectDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TheAttributeObjectService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TheAttributeObject(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.theAttributeObject).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
