package com.pds.backend.dominio.entidades;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

@Entity
public class Quantitativo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double quantidade;

    private Double totalDeHorasExecucao= 0.0;

    @OneToOne
    @JoinColumn(name = "servico_id")
    private Servico servico;

    @ManyToOne
    private OrdemDeServico ordem;

    public Quantitativo() {
    }

    public Quantitativo(Servico servico, Double quantidade) {
        this.servico = servico;
        this.quantidade = quantidade;
    }

    @PrePersist
    public void prePersist() {
        this.totalDeHorasExecucao = servico.getHorasParaExecutar1Und() * quantidade;
    }

    @PreUpdate
    public void preUpdate() {
        prePersist();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Servico getServico() {
        return servico;
    }

    public void setServico(Servico servico) {
        this.servico = servico;
    }

    public Double getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Double quantidade) {
        this.quantidade = quantidade;
    }

    public OrdemDeServico getOrdem() {
        return ordem;
    }

    public void setOrdem(OrdemDeServico ordem) {
        this.ordem = ordem;
    }

    public Double getTotalDeHorasExecucao() {
        return totalDeHorasExecucao;
    }

    public void setTotalDeHorasExecucao(Double totalDeHorasExecucao) {
        this.totalDeHorasExecucao = totalDeHorasExecucao;
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
        Quantitativo other = (Quantitativo) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Quantitativo [id=" + id + ", quantidade=" + quantidade + ", servico=" + servico + "]";
    }

}
