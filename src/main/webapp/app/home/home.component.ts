import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { JhiAlertService } from 'ng-jhipster';

import {Account, JhiAlertComponent, LoginModalService, Principal} from '../shared';
import {TheClass} from "../entities/the-class";
import {TheAttribute} from "../entities/the-attribute";
import {TheAttributeObject} from "../entities/the-attribute-object";
import {TheObject} from "../entities/the-object";

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.css'
    ]

})
export class HomeComponent implements OnInit {

    /*编辑数据代码*/
    classes : TheClass[];
    theAttributes : TheAttribute[];
    theClass : TheClass;
    theAttributeObjects : TheAttributeObject[];
    theObject : TheObject;


    //添加属性
    addAttribute() {
        let attribute : TheAttribute = new TheAttribute(null, "属性" + (this.theClass.theAttributes.length+1), this.theClass);
        this.theClass.theAttributes.push(attribute);
        for (let i=0; i<this.theClass.theObjects.length; ++i) {
            this.theClass.theObjects[i].theAttributeObjects.push(new TheAttributeObject(null, "对象" + (i+1) + "，属性" + this.theClass.theAttributes.length, this.theClass.theObjects[i], attribute));
        }
    }

    //添加对象
    addObject() {
        let attributeObjects = [];
        this.theClass.theObjects.push(new TheObject(null, this.theClass, null));
        for (let i : number=0; i<this.theClass.theAttributes.length; ++i) {
            attributeObjects.push(new TheAttributeObject(null,"对象" + (this.theClass.theObjects.length) + "，属性" + (i+1), this.theClass.theObjects[this.theClass.theObjects.length-1], this.theClass.theAttributes[i]));
        }
        this.theClass.theObjects[this.theClass.theObjects.length-1].theAttributeObjects = attributeObjects;
    }

    //测试方法
    test() {
        // let testStr = "aaaaa\naaa";
        // this.jhiAlertService.success(testStr);
        console.log(this.theClass);
    }




















    /*初始化代码*/
    account: Account;
    modalRef: NgbModalRef;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private jhiAlertService: JhiAlertService
    ) {
        this.classes = [{}];
        this.theAttributes = [new TheAttribute(null, "属性1"), new TheAttribute(null, "属性2")];
        this.theClass = new TheClass(null, "Authority", "jhi_authority", [], this.theAttributes);
        this.theAttributeObjects = [
            new TheAttributeObject(null, "对象1，属性1", null, this.theAttributes[0]),
            new TheAttributeObject(null, "对象1，属性2", null, this.theAttributes[1])
        ];
        this.theObject = new TheObject(null, this.theClass, this.theAttributeObjects);
        this.theAttributeObjects[0].theObject = this.theObject;
        this.theAttributeObjects[1].theObject = this.theObject;
        this.theClass.theObjects.push(this.theObject);
        this.theAttributes[0].theClass = this.theClass;
        this.theAttributes[1].theClass = this.theClass;
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
