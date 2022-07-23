import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutividadeListComponent } from './produtividade-list.component';

describe('ProdutividadeListComponent', () => {
  let component: ProdutividadeListComponent;
  let fixture: ComponentFixture<ProdutividadeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutividadeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutividadeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
