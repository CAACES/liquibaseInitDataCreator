import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LiquibaseInitDataCreatorSharedModule } from '../../shared';
import {
    TheClassService,
    TheClassPopupService,
    TheClassComponent,
    TheClassDetailComponent,
    TheClassDialogComponent,
    TheClassPopupComponent,
    TheClassDeletePopupComponent,
    TheClassDeleteDialogComponent,
    theClassRoute,
    theClassPopupRoute,
} from './';

const ENTITY_STATES = [
    ...theClassRoute,
    ...theClassPopupRoute,
];

@NgModule({
    imports: [
        LiquibaseInitDataCreatorSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TheClassComponent,
        TheClassDetailComponent,
        TheClassDialogComponent,
        TheClassDeleteDialogComponent,
        TheClassPopupComponent,
        TheClassDeletePopupComponent,
    ],
    entryComponents: [
        TheClassComponent,
        TheClassDialogComponent,
        TheClassPopupComponent,
        TheClassDeleteDialogComponent,
        TheClassDeletePopupComponent,
    ],
    providers: [
        TheClassService,
        TheClassPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LiquibaseInitDataCreatorTheClassModule {}
