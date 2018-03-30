import { BaseEntity } from './../../shared';
import {TheObject} from "../the-object";
import {TheAttribute} from "../the-attribute";

export class TheAttributeObject implements BaseEntity {
    constructor(
        public id?: number,
        public value?: string,
        public theObject?: TheObject,
        public theAttribute?: TheAttribute,
    ) {
    }
}
