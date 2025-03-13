import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityMapComponent } from './university-map.component';

describe('UniversityMapComponent', () => {
  let component: UniversityMapComponent;
  let fixture: ComponentFixture<UniversityMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniversityMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversityMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
