import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LiquibaseInitDataCreatorSharedModule } from '../../shared';
import {
    TheObjectService,
    TheObjectPopupService,
    TheObjectComponent,
    TheObjectDetailComponent,
    TheObjectDialogComponent,
    TheObjectPopupComponent,
    TheObjectDeletePopupComponent,
    TheObjectDeleteDialogComponent,
    theObjectRoute,
    theObjectPopupRoute,
} from './';

const ENTITY_STATES = [
    ...theObjectRoute,
    ...theObjectPopupRoute,
];

@NgModule({
    imports: [
        LiquibaseInitDataCreatorSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TheObjectComponent,
        TheObjectDetailComponent,
        TheObjectDialogComponent,
        TheObjectDeleteDialogComponent,
        TheObjectPopupComponent,
        TheObjectDeletePopupComponent,
    ],
    entryComponents: [
        TheObjectComponent,
        TheObjectDialogComponent,
        TheObjectPopupComponent,
        TheObjectDeleteDialogComponent,
        TheObjectDeletePopupComponent,
    ],
    providers: [
        TheObjectService,
        TheObjectPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LiquibaseInitDataCreatorTheObjectModule {}
