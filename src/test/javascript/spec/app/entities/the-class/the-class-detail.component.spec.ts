/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LiquibaseInitDataCreatorTestModule } from '../../../test.module';
import { TheClassDetailComponent } from '../../../../../../main/webapp/app/entities/the-class/the-class-detail.component';
import { TheClassService } from '../../../../../../main/webapp/app/entities/the-class/the-class.service';
import { TheClass } from '../../../../../../main/webapp/app/entities/the-class/the-class.model';

describe('Component Tests', () => {

    describe('TheClass Management Detail Component', () => {
        let comp: TheClassDetailComponent;
        let fixture: ComponentFixture<TheClassDetailComponent>;
        let service: TheClassService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LiquibaseInitDataCreatorTestModule],
                declarations: [TheClassDetailComponent],
                providers: [
                    TheClassService
                ]
            })
            .overrideTemplate(TheClassDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TheClassDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TheClassService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TheClass(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.theClass).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
