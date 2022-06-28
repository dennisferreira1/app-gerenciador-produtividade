package com.pds.backend.dominio.entidades;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

@Entity
public class ExecucaoOrdemServico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany
    private List<Profissional> profissionais;


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

    public List<Profissional> getProfissionais() {
        return profissionais;
    }

    public void setProfissionais(List<Profissional> profissionais) {
        this.profissionais = profissionais;
    }

    @Override
    public String toString() {
        return "ExecucaoOrdemServico [id=" + id + ", profissionais=" + profissionais + "]";
    }  
}
