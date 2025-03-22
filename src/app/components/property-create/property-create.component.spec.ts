import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertyCreateComponent } from './property-create.component';

describe('PropertyCreateComponent', () => {
  let component: PropertyCreateComponent;
  let fixture: ComponentFixture<PropertyCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


.container {
  display: flex;
  gap: 2rem; /* Adjust the gap as needed */
}

.form-section {
  width: 50%;
}

.properties-section {
  width: 50%;
}

.grid-2-col {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem; /* Adjust the gap as needed */
}