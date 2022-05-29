import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoParticipanteComponent } from './resultado-participante.component';

describe('ResultadoParticipanteComponent', () => {
  let component: ResultadoParticipanteComponent;
  let fixture: ComponentFixture<ResultadoParticipanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadoParticipanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
