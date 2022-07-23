package com.pds.backend.dominio.entidades;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

@Entity
public class OrdemDeServico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao;

    private String numeroRequisicao;

    private Double totalHorasExecucao= 0.0;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private ExecucaoOrdemServico execucaoOrdemServico;

    @OneToMany(mappedBy = "ordem", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Quantitativo> quantitativos = new ArrayList<>();

    public void addQuantitavo(Quantitativo q) {
        quantitativos.add(q);
        q.setOrdem(this);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getNumeroRequisicao() {
        return numeroRequisicao;
    }

    public void setNumeroRequisicao(String numeroRequisicao) {
        this.numeroRequisicao = numeroRequisicao;
    }

    public ExecucaoOrdemServico getExecucaoOrdemServico() {
        return execucaoOrdemServico;
    }

    public void setExecucaoOrdemServico(ExecucaoOrdemServico execucaoOrdemServico) {
        this.execucaoOrdemServico = execucaoOrdemServico;
    }

    public List<Quantitativo> getQuantitativos() {
        return quantitativos;
    }

    public void setQuantitativos(List<Quantitativo> quantitativos) {
        this.quantitativos = quantitativos;
    }

    public Double getTotalHorasExecucao() {
        return totalHorasExecucao;
    }

    public void setTotalHorasExecucao(Double totalHorasExecucao) {
        this.totalHorasExecucao = totalHorasExecucao;
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
        OrdemDeServico other = (OrdemDeServico) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "OrdemDeServico [descricao=" + descricao + ", execucaoOrdemServico=" + execucaoOrdemServico + ", id="
                + id + ", numeroRequisicao=" + numeroRequisicao + ", quantitativos=" + quantitativos + "]";
    }

}
