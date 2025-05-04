import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelcomponentComponent } from './modelcomponent.component';

describe('ModelcomponentComponent', () => {
  let component: ModelcomponentComponent;
  let fixture: ComponentFixture<ModelcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelcomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
