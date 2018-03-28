import { BaseEntity } from './../../shared';

export class TheObject implements BaseEntity {
    constructor(
        public id?: number,
        public theClass?: BaseEntity,
        public theAttributeObjects?: BaseEntity[],
    ) {
    }
}
