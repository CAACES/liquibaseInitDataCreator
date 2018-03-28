import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TheObjectComponent } from './the-object.component';
import { TheObjectDetailComponent } from './the-object-detail.component';
import { TheObjectPopupComponent } from './the-object-dialog.component';
import { TheObjectDeletePopupComponent } from './the-object-delete-dialog.component';

export const theObjectRoute: Routes = [
    {
        path: 'the-object',
        component: TheObjectComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TheObjects'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'the-object/:id',
        component: TheObjectDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TheObjects'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const theObjectPopupRoute: Routes = [
    {
        path: 'the-object-new',
        component: TheObjectPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TheObjects'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'the-object/:id/edit',
        component: TheObjectPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TheObjects'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'the-object/:id/delete',
        component: TheObjectDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TheObjects'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
