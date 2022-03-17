import { Component, OnInit } from '@angular/core';
import { Photos } from 'src/app/models/photos';

@Component({
  selector: 'app-album-gallery',
  templateUrl: './album-gallery.component.html',
  styleUrls: ['./album-gallery.component.css']
})
export class AlbumGalleryComponent implements OnInit {
  public selectedPhoto?: number = null;
  public photos = [
    {
      url: "https://www.gstatic.com/webp/gallery/4.jpg",
      row: '1/3'
    },
    {url: "https://www.gstatic.com/webp/gallery/1.jpg"},
    {url: "https://www.gstatic.com/webp/gallery/3.jpg"},
    {url: "https://images.all-free-download.com/images/graphicwebp/dog_shepherd_dog_sheep_dog_239354.webp"},
    {url: "https://www.gstatic.com/webp/gallery/2.jpg"},
    {
      url: "https://images.all-free-download.com/images/graphicwebp/dwarf_spitz_pomeranian_dog_265956.webp",
      row: '2/4',
      col: '3'
    },
    {url: "https://images.all-free-download.com/images/graphicwebp/puppy_dog_smiling_dog_235507.webp"}
  ] as Array<Photos>;


  constructor() { }

  ngOnInit(): void {
  }

}
