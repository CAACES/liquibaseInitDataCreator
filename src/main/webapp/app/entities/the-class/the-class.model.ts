import { BaseEntity } from './../../shared';
import {TheAttribute} from "../the-attribute";
import {TheObject} from "../the-object/the-object.model";

export class TheClass implements BaseEntity {
    constructor(
        public id?: number,
        public className?: string,
        public tableName?: string,
        public theObjects?: TheObject[],
        public theAttributes?: TheAttribute[],
    ) {
    }
}
