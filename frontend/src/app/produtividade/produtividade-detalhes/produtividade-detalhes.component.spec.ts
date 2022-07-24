import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutividadeDetalhesComponent } from './produtividade-detalhes.component';

describe('ProdutividadeDetalhesComponent', () => {
  let component: ProdutividadeDetalhesComponent;
  let fixture: ComponentFixture<ProdutividadeDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutividadeDetalhesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutividadeDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
