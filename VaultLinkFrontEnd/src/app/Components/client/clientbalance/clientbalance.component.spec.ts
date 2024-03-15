import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientbalanceComponent } from './clientbalance.component';

describe('ClientbalanceComponent', () => {
  let component: ClientbalanceComponent;
  let fixture: ComponentFixture<ClientbalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientbalanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientbalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
