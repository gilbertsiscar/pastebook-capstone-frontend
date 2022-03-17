import { Component, OnInit, Input, Output } from '@angular/core';
import { Photos } from 'src/app/models/photos';
import { EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-gallery-carousel',
  templateUrl: './gallery-carousel.component.html',
  styleUrls: ['./gallery-carousel.component.css'],
  animations: [
    trigger('slide-in', [

      state('left', style({
        opacity: 0,
        transform: 'translateX(-100%)'
      })),

      state('middle', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),

      state('right', style({
        opacity: 0,
        transform: 'translateX(100%)'
      })),

      transition('left => middle', [
        style({
          opacity: 0,
          transform: 'translateX(100%)'
        }),
        animate('250ms')
      ]),

      transition('right => middle', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('250ms')
      ]),
      
      transition('middle => *', [
        animate('250ms')
      ])
    ])  
  ]
})
export class GalleryCarouselComponent implements OnInit {

  @Input() photos: Array<Photos>;
  @Input() selectedPhoto: number;
  @Output() closeCarousel = new EventEmitter<void>();
  public animState = 'middle';
  public animPhoto: number;


  constructor() { }

  ngOnInit(): void {
    this.animPhoto = this.selectedPhoto;
  }

  public close(): void {
    this.closeCarousel.emit();
  }

  public previous(): void{
    this.animState = 'left';
    this.selectedPhoto = this.selectedPhoto > 0 ? this.selectedPhoto - 1: this.photos.length - 1;
    this.blur();
  }

  public next(): void {
    this.animState = 'right';
    this.selectedPhoto = this.selectedPhoto < this.photos.length - 1 ? this.selectedPhoto + 1: 0;
    this.blur();
  }

  public animDone(): void {
    this.animPhoto = this.selectedPhoto;
    this.animState = 'middle';
  }

  public onEvent(event: Event): void {
    event.stopPropagation();
  }

  private blur(): void {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement !== null) {
      activeElement.blur();
    }
  }

}
