import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LiquibaseInitDataCreatorSharedModule } from '../../shared';
import {
    TheAttributeService,
    TheAttributePopupService,
    TheAttributeComponent,
    TheAttributeDetailComponent,
    TheAttributeDialogComponent,
    TheAttributePopupComponent,
    TheAttributeDeletePopupComponent,
    TheAttributeDeleteDialogComponent,
    theAttributeRoute,
    theAttributePopupRoute,
} from './';

const ENTITY_STATES = [
    ...theAttributeRoute,
    ...theAttributePopupRoute,
];

@NgModule({
    imports: [
        LiquibaseInitDataCreatorSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TheAttributeComponent,
        TheAttributeDetailComponent,
        TheAttributeDialogComponent,
        TheAttributeDeleteDialogComponent,
        TheAttributePopupComponent,
        TheAttributeDeletePopupComponent,
    ],
    entryComponents: [
        TheAttributeComponent,
        TheAttributeDialogComponent,
        TheAttributePopupComponent,
        TheAttributeDeleteDialogComponent,
        TheAttributeDeletePopupComponent,
    ],
    providers: [
        TheAttributeService,
        TheAttributePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LiquibaseInitDataCreatorTheAttributeModule {}
