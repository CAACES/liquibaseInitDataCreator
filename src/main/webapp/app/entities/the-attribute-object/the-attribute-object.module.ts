import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LiquibaseInitDataCreatorSharedModule } from '../../shared';
import {
    TheAttributeObjectService,
    TheAttributeObjectPopupService,
    TheAttributeObjectComponent,
    TheAttributeObjectDetailComponent,
    TheAttributeObjectDialogComponent,
    TheAttributeObjectPopupComponent,
    TheAttributeObjectDeletePopupComponent,
    TheAttributeObjectDeleteDialogComponent,
    theAttributeObjectRoute,
    theAttributeObjectPopupRoute,
} from './';

const ENTITY_STATES = [
    ...theAttributeObjectRoute,
    ...theAttributeObjectPopupRoute,
];

@NgModule({
    imports: [
        LiquibaseInitDataCreatorSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TheAttributeObjectComponent,
        TheAttributeObjectDetailComponent,
        TheAttributeObjectDialogComponent,
        TheAttributeObjectDeleteDialogComponent,
        TheAttributeObjectPopupComponent,
        TheAttributeObjectDeletePopupComponent,
    ],
    entryComponents: [
        TheAttributeObjectComponent,
        TheAttributeObjectDialogComponent,
        TheAttributeObjectPopupComponent,
        TheAttributeObjectDeleteDialogComponent,
        TheAttributeObjectDeletePopupComponent,
    ],
    providers: [
        TheAttributeObjectService,
        TheAttributeObjectPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LiquibaseInitDataCreatorTheAttributeObjectModule {}
