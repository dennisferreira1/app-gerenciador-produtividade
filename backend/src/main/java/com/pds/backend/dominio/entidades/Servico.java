package com.pds.backend.dominio.entidades;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Servico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao;

    private String und;

    @OneToMany(mappedBy = "servico")
    private List<Quantitativo> quantitativos;

    public Servico() {
    }

    public Servico(Long id, String descricao, String und) {
        this.id = id;
        this.descricao = descricao;
        this.und = und;
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

    public String getUnd() {
        return und;
    }
    public void setUnd(String und) {
        this.und = und;
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
        Servico other = (Servico) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Servico [descricao=" + descricao + ", id=" + id + ", und=" + und + "]";
    }

    public List<Quantitativo> getQuantitativo() {
        return quantitativos;
    }

    public void setQuantitativo(List<Quantitativo> quantitativo) {
        this.quantitativos = quantitativo;
    }

}
