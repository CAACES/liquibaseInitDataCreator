import { BaseEntity } from './../../shared';

export class TheAttributeObject implements BaseEntity {
    constructor(
        public id?: number,
        public value?: string,
        public theObject?: BaseEntity,
        public theAttribute?: BaseEntity,
    ) {
    }
}
