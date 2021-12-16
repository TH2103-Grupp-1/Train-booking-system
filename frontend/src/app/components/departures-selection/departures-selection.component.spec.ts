import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeparturesSelectionComponent } from './departures-selection.component';

describe('DeparturesSelectionComponent', () => {
  let component: DeparturesSelectionComponent;
  let fixture: ComponentFixture<DeparturesSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeparturesSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeparturesSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
