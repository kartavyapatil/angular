import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelforupdateComponent } from './modelforupdate.component';

describe('ModelforupdateComponent', () => {
  let component: ModelforupdateComponent;
  let fixture: ComponentFixture<ModelforupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelforupdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelforupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
