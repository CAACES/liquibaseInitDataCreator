/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LiquibaseInitDataCreatorTestModule } from '../../../test.module';
import { TheClassComponent } from '../../../../../../main/webapp/app/entities/the-class/the-class.component';
import { TheClassService } from '../../../../../../main/webapp/app/entities/the-class/the-class.service';
import { TheClass } from '../../../../../../main/webapp/app/entities/the-class/the-class.model';

describe('Component Tests', () => {

    describe('TheClass Management Component', () => {
        let comp: TheClassComponent;
        let fixture: ComponentFixture<TheClassComponent>;
        let service: TheClassService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LiquibaseInitDataCreatorTestModule],
                declarations: [TheClassComponent],
                providers: [
                    TheClassService
                ]
            })
            .overrideTemplate(TheClassComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TheClassComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TheClassService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TheClass(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.theClasses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
