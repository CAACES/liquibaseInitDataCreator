import { BaseEntity } from './../../shared';

export class TheAttribute implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public theClass?: BaseEntity,
        public theAttributeObjects?: BaseEntity[],
    ) {
    }
}
