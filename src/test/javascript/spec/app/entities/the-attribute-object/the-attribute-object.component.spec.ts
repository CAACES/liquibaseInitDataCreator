/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LiquibaseInitDataCreatorTestModule } from '../../../test.module';
import { TheAttributeObjectComponent } from '../../../../../../main/webapp/app/entities/the-attribute-object/the-attribute-object.component';
import { TheAttributeObjectService } from '../../../../../../main/webapp/app/entities/the-attribute-object/the-attribute-object.service';
import { TheAttributeObject } from '../../../../../../main/webapp/app/entities/the-attribute-object/the-attribute-object.model';

describe('Component Tests', () => {

    describe('TheAttributeObject Management Component', () => {
        let comp: TheAttributeObjectComponent;
        let fixture: ComponentFixture<TheAttributeObjectComponent>;
        let service: TheAttributeObjectService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LiquibaseInitDataCreatorTestModule],
                declarations: [TheAttributeObjectComponent],
                providers: [
                    TheAttributeObjectService
                ]
            })
            .overrideTemplate(TheAttributeObjectComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TheAttributeObjectComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TheAttributeObjectService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TheAttributeObject(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.theAttributeObjects[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
