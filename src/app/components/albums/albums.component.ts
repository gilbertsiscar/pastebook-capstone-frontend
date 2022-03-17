import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AlbumService } from 'src/app/services/album.service';
import { Album } from 'src/app/models/album';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  // variables for uploading and displaying photos
  url1 = "http://localhost:8080/api/tl/photos";
  url2 = "http://localhost:8080/api/tl/display/albums";

  // name of the album to create
  albumToCreate = "New Album";

  albums: Album[] = [];

  profileId: number = this.getProfileId();

  // need id of currently logged-in user for the 'create album' function
  currentlyLoggedId: number = parseInt(localStorage.getItem('idNumber')!);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private albumService: AlbumService
  ) {
      let profileUrl: string = this.route.snapshot.params['profileUrl'];
      let userId: number = parseInt(profileUrl.replace(/\D/g, ""));

      albumService.getAlbums(userId).subscribe((response: Album[] ) => {
        this.albums = response;
      })

    }
  ngOnInit(): void {
  }

  onCreateAlbum(albumName: string, id: number) {
    this.albumService.createAlbum(this.albumToCreate, this.currentlyLoggedId).subscribe(() => {});
  }

  getProfileId(): number {
    let profileUrl: string = this.route.snapshot.params['profileUrl'];
    let userId: number = parseInt(profileUrl.replace(/\D/g, ""));
    return userId;
  }

  deleteAlbum(albumId: number) {
    this.albumService.deleteAlbum(albumId).subscribe(() => {});
  }

  // for renaming an album
  onSubmit(album: Album) {
    this.albumService.renameAlbum(album).subscribe(() => {});
  }

  // for checking if owner of the album or not (for ngIf)
  isOwner(): boolean {
    let profileUrl: string = this.route.snapshot.params['profileUrl'];
    let userId: number = parseInt(profileUrl.replace(/\D/g, ""));
    if (this.currentlyLoggedId == userId) {
      return true;
    } else {
      return false;
    }
  }

}
