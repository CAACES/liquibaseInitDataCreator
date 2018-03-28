import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TheAttributeObjectComponent } from './the-attribute-object.component';
import { TheAttributeObjectDetailComponent } from './the-attribute-object-detail.component';
import { TheAttributeObjectPopupComponent } from './the-attribute-object-dialog.component';
import { TheAttributeObjectDeletePopupComponent } from './the-attribute-object-delete-dialog.component';

export const theAttributeObjectRoute: Routes = [
    {
        path: 'the-attribute-object',
        component: TheAttributeObjectComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TheAttributeObjects'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'the-attribute-object/:id',
        component: TheAttributeObjectDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TheAttributeObjects'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const theAttributeObjectPopupRoute: Routes = [
    {
        path: 'the-attribute-object-new',
        component: TheAttributeObjectPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TheAttributeObjects'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'the-attribute-object/:id/edit',
        component: TheAttributeObjectPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TheAttributeObjects'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'the-attribute-object/:id/delete',
        component: TheAttributeObjectDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TheAttributeObjects'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
