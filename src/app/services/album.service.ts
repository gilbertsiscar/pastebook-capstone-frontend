import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { Album } from '../models/album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private baseUrl: string = environment.apiUrl + '/albums';

  constructor(
    private http: HttpClient
  ) {
    // use getAlbums here later
  }

  // create album
  createAlbum(albumName: string, userId: number): Observable<Object> {
    return this.http.post(this.baseUrl, {albumName, userId}, {responseType: 'text'});
  }

  // rename album
  renameAlbum(album: Album): Observable<Object> {
    return this.http.put(this.baseUrl + `/${album.id}`, album, {responseType: 'text'});
  }

  // delete album
  deleteAlbum(albumId: number): Observable<Object> {
    return this.http.delete(this.baseUrl + `/${albumId}`);
  }
 
  // get albums from user
  getAlbums(userId: number): Observable<Album[]> {
    return this.http.get<Album[]>(this.baseUrl + `/${userId}`);
  }
}
