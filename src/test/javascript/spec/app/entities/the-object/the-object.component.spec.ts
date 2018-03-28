/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LiquibaseInitDataCreatorTestModule } from '../../../test.module';
import { TheObjectComponent } from '../../../../../../main/webapp/app/entities/the-object/the-object.component';
import { TheObjectService } from '../../../../../../main/webapp/app/entities/the-object/the-object.service';
import { TheObject } from '../../../../../../main/webapp/app/entities/the-object/the-object.model';

describe('Component Tests', () => {

    describe('TheObject Management Component', () => {
        let comp: TheObjectComponent;
        let fixture: ComponentFixture<TheObjectComponent>;
        let service: TheObjectService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LiquibaseInitDataCreatorTestModule],
                declarations: [TheObjectComponent],
                providers: [
                    TheObjectService
                ]
            })
            .overrideTemplate(TheObjectComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TheObjectComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TheObjectService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TheObject(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.theObjects[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
