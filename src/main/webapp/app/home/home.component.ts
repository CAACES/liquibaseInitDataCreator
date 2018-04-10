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
/*
* 1.输出数据
* 2.编辑输入对象
* */
export class HomeComponent implements OnInit {

    /*我的属性*/
    classes : TheClass[] = [];
    /*当前操作对象索引*/
    currentlyClassesIndex : number = 0;

    /*输出属性*/
    exportString : string;

    /*输入属性*/
    importString : string;
    importClassName : string;
    // importClass : TheClass;

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
        for (let i=0; i<1; ++i)
            this.classes.push(this.getADemoClassObject("类"));
    }

    //获取count个演示类对象
    getADemoClassObject(className : string): TheClass{
        let theClass : TheClass;    //类
        let theAttributes : TheAttribute[] = [];    //类的属性
        let theObject : TheObject;  //对象
        let theAttributeObjects : TheAttributeObject[] = [];    //对象的属性

        //创建“类的属性”对象，并赋值
        theAttributes = [new TheAttribute(null, "属性1"), new TheAttribute(null, "属性2")];
        //创建“类”对象，并赋值
        theClass = new TheClass(null, className, className, [], theAttributes);
        theAttributeObjects = [     //创建“对象的属性”对象，并赋值
            new TheAttributeObject(null, "对象1，属性1", null, theAttributes[0]),
            new TheAttributeObject(null, "对象1，属性2", null, theAttributes[1])
        ];

        //创建“对象”对象，并赋值
        theObject = new TheObject(null, theClass, theAttributeObjects);
        //给“对象的属性”对象的theObject（父类）赋值
        theAttributeObjects[0].theObject = theObject;
        theAttributeObjects[1].theObject = theObject;
        //给“类的属性”theClass（父类）赋值
        theAttributes[0].theClass = theClass;
        theAttributes[1].theClass = theClass;

        //把“对象”对象添加到“类”对象里
        theClass.theObjects.push(theObject);

        return theClass;
    }

    //添加类
    addClass() {
        this.classes.push(this.getADemoClassObject("新的类"));
    }

    //删除类
    deleteClass(classesIndex) {
        this.classes.splice(classesIndex, 1);
    }

    //添加属性
    addAttribute(classesIndex) {
        let attribute : TheAttribute = new TheAttribute(null, "属性" + (this.classes[classesIndex].theAttributes.length+1), this.classes[classesIndex]);
        this.classes[classesIndex].theAttributes.push(attribute);
        for (let i=0; i<this.classes[classesIndex].theObjects.length; ++i) {
            this.classes[classesIndex].theObjects[i].theAttributeObjects.push(new TheAttributeObject(null, "对象" + (i+1) + "，属性" + this.classes[classesIndex].theAttributes.length, this.classes[classesIndex].theObjects[i], attribute));
        }
    }

    //删除属性
    deleteAttribute(classesIndex, attributeIndex) {
        this.classes[classesIndex].theAttributes.splice(attributeIndex, 1);
        for (let i=0; i<this.classes[classesIndex].theObjects.length; ++i) {
            this.classes[classesIndex].theObjects[i].theAttributeObjects.splice(attributeIndex, 1);
        }
    }

    //添加对象
    addObject(classesIndex) {
        let attributeObjects = [];
        this.classes[classesIndex].theObjects.push(new TheObject(null, this.classes[classesIndex], null));
        for (let i : number=0; i<this.classes[classesIndex].theAttributes.length; ++i) {
            attributeObjects.push(new TheAttributeObject(null,"对象" + (this.classes[classesIndex].theObjects.length) + "，属性" + (i+1), this.classes[classesIndex].theObjects[this.classes[classesIndex].theObjects.length-1], this.classes[classesIndex].theAttributes[i]));
        }
        this.classes[classesIndex].theObjects[this.classes[classesIndex].theObjects.length-1].theAttributeObjects = attributeObjects;
    }

    //删除对象
    deleteObject(classesIndex, objectsIndex) {
        this.classes[classesIndex].theObjects.splice(objectsIndex, 1);
    }

    //输出数据
    exportData() {
        let data : string = "";

        data += "id;";
        for (let i=0; i<this.classes[this.currentlyClassesIndex].theAttributes.length; ++i) {
            var t = this.classes[this.currentlyClassesIndex].theAttributes[i].name ? this.classes[this.currentlyClassesIndex].theAttributes[i].name : "NULL";
            if (i === this.classes[this.currentlyClassesIndex].theAttributes.length-1)
                data += t + "\n";
            else
                data += t + ";";
        }
        for (let i=0; i<this.classes[this.currentlyClassesIndex].theObjects.length; ++i) {
            data += (i+1) + ";";
            for (let j=0; j<this.classes[this.currentlyClassesIndex].theObjects[i].theAttributeObjects.length; ++j) {
                var t = this.classes[this.currentlyClassesIndex].theObjects[i].theAttributeObjects[j].value ? this.classes[this.currentlyClassesIndex].theObjects[i].theAttributeObjects[j].value : "NULL";
                if (j === this.classes[this.currentlyClassesIndex].theObjects[i].theAttributeObjects.length-1)
                    data += t + "\n";
                else
                    data += t + ";";
            }
        }
        this.exportString = data;
        // console.log(this.exportString);
    }

    //输入数据
    importData() {
        let t : TheObject[] = [];
        let importClass : TheClass = new TheClass(null,this.importClassName, null, t);
        //清除前后空格
        this.importString = this.importString.replace(/^\s+|\s+$/g,"");
        let importAttributeValues = [];
        let importAttributes : TheAttribute[] = [];
        this.jhiAlertService.success("输入数据↓\n" + this.importString);
        let table = this.importString.split("\n");

        importAttributeValues = table[0].split(";");
        for (let i=0 ;i<importAttributeValues.length; ++i){
            importAttributes.push(new TheAttribute(null, importAttributeValues[i], importClass, null));
        }
        importClass.theAttributes = importAttributes;
        for (let i=1; i<table.length; ++i) {
            let tObject : TheObject = new TheObject(null, importClass, null);
            let tAttributeObjects : TheAttributeObject[] = [];
            let tAttributeObjectValues;
            tAttributeObjectValues = table[i].split(";");
            for (let j=0; j<tAttributeObjectValues.length; ++j){
                tAttributeObjects.push(new TheAttributeObject(null, tAttributeObjectValues[j], tObject, importAttributes[j]));
            }
            tObject.theAttributeObjects = tAttributeObjects;
            importClass.theObjects.push(tObject);
        }

        this.classes.push(importClass);
        this.modalRef.close();
    }

    // //切换编辑对象
    // changeEditClass() {
    //     // this.initClass = Object.assign({}, this.importClass);
    //     var t : TheObject[] = [];
    //     this.importClass = new TheClass(null, "importClassName", "importTableName", t, null);
    // }

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
