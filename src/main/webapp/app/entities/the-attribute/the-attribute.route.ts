import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TheAttributeComponent } from './the-attribute.component';
import { TheAttributeDetailComponent } from './the-attribute-detail.component';
import { TheAttributePopupComponent } from './the-attribute-dialog.component';
import { TheAttributeDeletePopupComponent } from './the-attribute-delete-dialog.component';

export const theAttributeRoute: Routes = [
    {
        path: 'the-attribute',
        component: TheAttributeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TheAttributes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'the-attribute/:id',
        component: TheAttributeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TheAttributes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const theAttributePopupRoute: Routes = [
    {
        path: 'the-attribute-new',
        component: TheAttributePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TheAttributes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'the-attribute/:id/edit',
        component: TheAttributePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TheAttributes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'the-attribute/:id/delete',
        component: TheAttributeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TheAttributes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
