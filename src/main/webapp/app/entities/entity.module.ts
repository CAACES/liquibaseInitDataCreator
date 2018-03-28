import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LiquibaseInitDataCreatorTheClassModule } from './the-class/the-class.module';
import { LiquibaseInitDataCreatorTheObjectModule } from './the-object/the-object.module';
import { LiquibaseInitDataCreatorTheAttributeModule } from './the-attribute/the-attribute.module';
import { LiquibaseInitDataCreatorTheAttributeObjectModule } from './the-attribute-object/the-attribute-object.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        LiquibaseInitDataCreatorTheClassModule,
        LiquibaseInitDataCreatorTheObjectModule,
        LiquibaseInitDataCreatorTheAttributeModule,
        LiquibaseInitDataCreatorTheAttributeObjectModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LiquibaseInitDataCreatorEntityModule {}
