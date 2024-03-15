import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientdepositeComponent } from './clientdeposite.component';

describe('ClientdepositeComponent', () => {
  let component: ClientdepositeComponent;
  let fixture: ComponentFixture<ClientdepositeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientdepositeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientdepositeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
