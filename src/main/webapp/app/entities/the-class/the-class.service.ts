import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TheClass } from './the-class.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TheClass>;

@Injectable()
export class TheClassService {

    private resourceUrl =  SERVER_API_URL + 'api/the-classes';

    constructor(private http: HttpClient) { }

    create(theClass: TheClass): Observable<EntityResponseType> {
        const copy = this.convert(theClass);
        return this.http.post<TheClass>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(theClass: TheClass): Observable<EntityResponseType> {
        const copy = this.convert(theClass);
        return this.http.put<TheClass>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TheClass>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TheClass[]>> {
        const options = createRequestOption(req);
        return this.http.get<TheClass[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TheClass[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TheClass = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TheClass[]>): HttpResponse<TheClass[]> {
        const jsonResponse: TheClass[] = res.body;
        const body: TheClass[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TheClass.
     */
    private convertItemFromServer(theClass: TheClass): TheClass {
        const copy: TheClass = Object.assign({}, theClass);
        return copy;
    }

    /**
     * Convert a TheClass to a JSON which can be sent to the server.
     */
    private convert(theClass: TheClass): TheClass {
        const copy: TheClass = Object.assign({}, theClass);
        return copy;
    }
}
