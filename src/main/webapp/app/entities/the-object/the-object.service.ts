import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TheObject } from './the-object.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TheObject>;

@Injectable()
export class TheObjectService {

    private resourceUrl =  SERVER_API_URL + 'api/the-objects';

    constructor(private http: HttpClient) { }

    create(theObject: TheObject): Observable<EntityResponseType> {
        const copy = this.convert(theObject);
        return this.http.post<TheObject>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(theObject: TheObject): Observable<EntityResponseType> {
        const copy = this.convert(theObject);
        return this.http.put<TheObject>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TheObject>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TheObject[]>> {
        const options = createRequestOption(req);
        return this.http.get<TheObject[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TheObject[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TheObject = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TheObject[]>): HttpResponse<TheObject[]> {
        const jsonResponse: TheObject[] = res.body;
        const body: TheObject[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TheObject.
     */
    private convertItemFromServer(theObject: TheObject): TheObject {
        const copy: TheObject = Object.assign({}, theObject);
        return copy;
    }

    /**
     * Convert a TheObject to a JSON which can be sent to the server.
     */
    private convert(theObject: TheObject): TheObject {
        const copy: TheObject = Object.assign({}, theObject);
        return copy;
    }
}
