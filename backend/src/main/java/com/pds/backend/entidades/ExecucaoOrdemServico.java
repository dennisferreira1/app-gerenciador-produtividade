package com.pds.backend.entidades;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;

@Entity
public class ExecucaoOrdemServico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany(mappedBy = "listExecucaoOrdemServico")
    private List<Profissional> profissionais;

    @OneToOne
    @JoinColumn(name = "ordem_servico_id")
    private OrdemDeServico ordemServico;

    public ExecucaoOrdemServico() {
    }

    public ExecucaoOrdemServico(List<Profissional> profissionais) {
        this.profissionais = profissionais;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public OrdemDeServico getOrdemServico() {
        return ordemServico;
    }

    public void setOrdemServico(OrdemDeServico ordemServico) {
        this.ordemServico = ordemServico;
    }

    public List<Profissional> getProfissionais() {
        return profissionais;
    }

    public void setProfissionais(List<Profissional> profissionais) {
        this.profissionais = profissionais;
    }

    @Override
    public String toString() {
        return "ExecucaoOrdemServico [id=" + id + ", ordemServico=" + ordemServico + ", profissionais=" + profissionais
                + "]";
    }
    
}
