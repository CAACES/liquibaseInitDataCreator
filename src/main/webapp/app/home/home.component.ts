import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { JhiAlertService } from 'ng-jhipster';

import {Account, LoginModalService, Principal} from '../shared';
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

    /*我的属性*/
    classes : TheClass[];
    theAttributes : TheAttribute[];
    theClass : TheClass;
    theAttributeObjects : TheAttributeObject[];
    theObject : TheObject;

    /*输出属性*/
    exportString : string;

    /*输入属性*/
    importString : string;
    importClass : TheClass;

    //模态框
    closeResult: string;

    /*初始属性*/
    account: Account;
    modalRef: NgbModalRef;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private jhiAlertService: JhiAlertService,
        private modalService: NgbModal
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

        let t : TheObject[] = [];
        this.importClass = new TheClass(null, "importClassName", "importTableName", t, null);
    }


    //添加属性
    addAttribute() {
        let attribute : TheAttribute = new TheAttribute(null, "属性" + (this.theClass.theAttributes.length+1), this.theClass);
        this.theClass.theAttributes.push(attribute);
        for (let i=0; i<this.theClass.theObjects.length; ++i) {
            this.theClass.theObjects[i].theAttributeObjects.push(new TheAttributeObject(null, "对象" + (i+1) + "，属性" + this.theClass.theAttributes.length, this.theClass.theObjects[i], attribute));
        }
    }

    //删除属性
    deleteAttribute(index) {
        this.theClass.theAttributes.splice(index, 1);
        for (let i=0; i<this.theClass.theObjects.length; ++i) {
            this.theClass.theObjects[i].theAttributeObjects.splice(index, 1);
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

    //删除对象
    deleteObject(index) {
        this.theClass.theObjects.splice(index, 1);
    }

    //输出数据
    exportData() {
        let data : string = "";

        data += "id;";
        for (let i=0; i<this.theClass.theAttributes.length; ++i) {
            var t = this.theClass.theAttributes[i].name ? this.theClass.theAttributes[i].name : "NULL";
            if (i === this.theClass.theAttributes.length-1)
                data += t + "\n";
            else
                data += t + ";";
        }
        for (let i=0; i<this.theClass.theObjects.length; ++i) {
            data += (i+1) + ";";
            for (let j=0; j<this.theClass.theObjects[i].theAttributeObjects.length; ++j) {
                var t = this.theClass.theObjects[i].theAttributeObjects[j].value ? this.theClass.theObjects[i].theAttributeObjects[j].value : "NULL";
                if (j === this.theClass.theObjects[i].theAttributeObjects.length-1)
                    data += t + "\n";
                else
                    data += t + ";";
            }
        }
        this.exportString = data;
        console.log(this.exportString);
    }

    //输入数据
    importData() {
        this.importString = this.importString.replace(/^\s+|\s+$/g,"");
        let importAttributeValues = [];
        let importAttributes : TheAttribute[] = [];
        this.jhiAlertService.success("输入数据↓\n" + this.importString);
        let table = this.importString.split("\n");

        importAttributeValues = table[0].split(";");
        for (let i=0 ;i<importAttributeValues.length; ++i){
            importAttributes.push(new TheAttribute(null, importAttributeValues[i], this.importClass, null));
        }
        this.importClass.theAttributes = importAttributes;
        for (let i=1; i<table.length; ++i) {
            let tObject : TheObject = new TheObject(null, this.importClass, null);
            let tAttributeObjects : TheAttributeObject[] = [];
            let tAttributeObjectValues;
            tAttributeObjectValues = table[i].split(";");
            for (let j=0; j<tAttributeObjectValues.length; ++j){
                tAttributeObjects.push(new TheAttributeObject(null, tAttributeObjectValues[j], tObject, importAttributes[j]));
            }
            tObject.theAttributeObjects = tAttributeObjects;
            this.importClass.theObjects.push(tObject);
        }
        this.modalRef.close();
    }

    //切换编辑对象
    changeEditClass() {
        this.theClass = Object.assign({}, this.importClass);
        var t : TheObject[] = [];
        this.importClass = new TheClass(null, "importClassName", "importTableName", t, null);
    }

    //测试方法
    test() {
        // console.log(this.theClass);
    }

    //输入模态框
    importDataOpen(content) {
        this.modalRef = this.modalService.open(content, { size: 'lg' });
        this.modalRef.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    //输出模态框
    exportDataOpen(content) {
        this.exportData();
        this.modalRef = this.modalService.open(content, { size: 'lg' });
        this.modalRef.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
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
