import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTicketManagerComponent } from './dashboard-ticket-manager.component';

describe('DashboardTicketManagerComponent', () => {
  let component: DashboardTicketManagerComponent;
  let fixture: ComponentFixture<DashboardTicketManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTicketManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTicketManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
