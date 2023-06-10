import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareImagesComponent } from './share-images.component';

describe('ShareImagesComponent', () => {
  let component: ShareImagesComponent;
  let fixture: ComponentFixture<ShareImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareImagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
