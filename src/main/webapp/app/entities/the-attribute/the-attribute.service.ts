import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TheAttribute } from './the-attribute.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TheAttribute>;

@Injectable()
export class TheAttributeService {

    private resourceUrl =  SERVER_API_URL + 'api/the-attributes';

    constructor(private http: HttpClient) { }

    create(theAttribute: TheAttribute): Observable<EntityResponseType> {
        const copy = this.convert(theAttribute);
        return this.http.post<TheAttribute>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(theAttribute: TheAttribute): Observable<EntityResponseType> {
        const copy = this.convert(theAttribute);
        return this.http.put<TheAttribute>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TheAttribute>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TheAttribute[]>> {
        const options = createRequestOption(req);
        return this.http.get<TheAttribute[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TheAttribute[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TheAttribute = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TheAttribute[]>): HttpResponse<TheAttribute[]> {
        const jsonResponse: TheAttribute[] = res.body;
        const body: TheAttribute[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TheAttribute.
     */
    private convertItemFromServer(theAttribute: TheAttribute): TheAttribute {
        const copy: TheAttribute = Object.assign({}, theAttribute);
        return copy;
    }

    /**
     * Convert a TheAttribute to a JSON which can be sent to the server.
     */
    private convert(theAttribute: TheAttribute): TheAttribute {
        const copy: TheAttribute = Object.assign({}, theAttribute);
        return copy;
    }
}
