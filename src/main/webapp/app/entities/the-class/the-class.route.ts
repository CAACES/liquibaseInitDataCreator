import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TheClassComponent } from './the-class.component';
import { TheClassDetailComponent } from './the-class-detail.component';
import { TheClassPopupComponent } from './the-class-dialog.component';
import { TheClassDeletePopupComponent } from './the-class-delete-dialog.component';

export const theClassRoute: Routes = [
    {
        path: 'the-class',
        component: TheClassComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TheClasses'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'the-class/:id',
        component: TheClassDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TheClasses'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const theClassPopupRoute: Routes = [
    {
        path: 'the-class-new',
        component: TheClassPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TheClasses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'the-class/:id/edit',
        component: TheClassPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TheClasses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'the-class/:id/delete',
        component: TheClassDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TheClasses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
