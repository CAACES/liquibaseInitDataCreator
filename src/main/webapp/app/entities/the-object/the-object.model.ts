import { BaseEntity } from './../../shared';
import {TheClass} from "../the-class";
import {TheAttributeObject} from "../the-attribute-object";

export class TheObject implements BaseEntity {
    constructor(
        public id?: number,
        public theClass?: TheClass,
        public theAttributeObjects?: TheAttributeObject[],
    ) {
    }
}
