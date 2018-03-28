/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LiquibaseInitDataCreatorTestModule } from '../../../test.module';
import { TheAttributeComponent } from '../../../../../../main/webapp/app/entities/the-attribute/the-attribute.component';
import { TheAttributeService } from '../../../../../../main/webapp/app/entities/the-attribute/the-attribute.service';
import { TheAttribute } from '../../../../../../main/webapp/app/entities/the-attribute/the-attribute.model';

describe('Component Tests', () => {

    describe('TheAttribute Management Component', () => {
        let comp: TheAttributeComponent;
        let fixture: ComponentFixture<TheAttributeComponent>;
        let service: TheAttributeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LiquibaseInitDataCreatorTestModule],
                declarations: [TheAttributeComponent],
                providers: [
                    TheAttributeService
                ]
            })
            .overrideTemplate(TheAttributeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TheAttributeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TheAttributeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TheAttribute(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.theAttributes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
