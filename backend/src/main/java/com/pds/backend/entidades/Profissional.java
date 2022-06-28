package com.pds.backend.entidades;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

@Entity
public class Profissional {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String nome;

    private String profissao;

    @ManyToMany
    @JoinTable(name = "ExecucaoOrdemServico_Profissional" , joinColumns = @JoinColumn(name = "profissionalId"), inverseJoinColumns = @JoinColumn(name = "execucaoOrdemServicoId"))
    private List<ExecucaoOrdemServico> listExecucaoOrdemServico;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getProfissao() {
        return profissao;
    }

    public void setProfissao(String profissao) {
        this.profissao = profissao;
    }

    public List<ExecucaoOrdemServico> getListExecucaoOrdemServico() {
        return listExecucaoOrdemServico;
    }

    public void setListExecucaoOrdemServico(List<ExecucaoOrdemServico> listExecucaoOrdemServico) {
        this.listExecucaoOrdemServico = listExecucaoOrdemServico;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Profissional other = (Profissional) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Profissional [id=" + id + ", listExecucaoOrdemServico=" + listExecucaoOrdemServico + ", nome=" + nome
                + ", profissao=" + profissao + "]";
    }

    
   
}
