/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LiquibaseInitDataCreatorTestModule } from '../../../test.module';
import { TheAttributeDetailComponent } from '../../../../../../main/webapp/app/entities/the-attribute/the-attribute-detail.component';
import { TheAttributeService } from '../../../../../../main/webapp/app/entities/the-attribute/the-attribute.service';
import { TheAttribute } from '../../../../../../main/webapp/app/entities/the-attribute/the-attribute.model';

describe('Component Tests', () => {

    describe('TheAttribute Management Detail Component', () => {
        let comp: TheAttributeDetailComponent;
        let fixture: ComponentFixture<TheAttributeDetailComponent>;
        let service: TheAttributeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LiquibaseInitDataCreatorTestModule],
                declarations: [TheAttributeDetailComponent],
                providers: [
                    TheAttributeService
                ]
            })
            .overrideTemplate(TheAttributeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TheAttributeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TheAttributeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TheAttribute(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.theAttribute).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
