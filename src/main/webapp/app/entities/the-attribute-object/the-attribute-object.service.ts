import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TheAttributeObject } from './the-attribute-object.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TheAttributeObject>;

@Injectable()
export class TheAttributeObjectService {

    private resourceUrl =  SERVER_API_URL + 'api/the-attribute-objects';

    constructor(private http: HttpClient) { }

    create(theAttributeObject: TheAttributeObject): Observable<EntityResponseType> {
        const copy = this.convert(theAttributeObject);
        return this.http.post<TheAttributeObject>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(theAttributeObject: TheAttributeObject): Observable<EntityResponseType> {
        const copy = this.convert(theAttributeObject);
        return this.http.put<TheAttributeObject>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TheAttributeObject>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TheAttributeObject[]>> {
        const options = createRequestOption(req);
        return this.http.get<TheAttributeObject[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TheAttributeObject[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TheAttributeObject = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TheAttributeObject[]>): HttpResponse<TheAttributeObject[]> {
        const jsonResponse: TheAttributeObject[] = res.body;
        const body: TheAttributeObject[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TheAttributeObject.
     */
    private convertItemFromServer(theAttributeObject: TheAttributeObject): TheAttributeObject {
        const copy: TheAttributeObject = Object.assign({}, theAttributeObject);
        return copy;
    }

    /**
     * Convert a TheAttributeObject to a JSON which can be sent to the server.
     */
    private convert(theAttributeObject: TheAttributeObject): TheAttributeObject {
        const copy: TheAttributeObject = Object.assign({}, theAttributeObject);
        return copy;
    }
}
