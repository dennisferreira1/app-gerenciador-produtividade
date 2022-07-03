package com.pds.backend.dominio.dto;

import java.util.List;

import com.pds.backend.dominio.entidades.Profissional;

public class OrdemServicoDTO {
    private Long id;
    private String numero;
    private String descricao;
    private List<ServicoDTO> servicos;
    private List<Profissional> profissionais;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getNumero() {
        return numero;
    }
    public void setNumero(String numero) {
        this.numero = numero;
    }
    public String getDescricao() {
        return descricao;
    }
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
    public List<ServicoDTO> getServicos() {
        return servicos;
    }
    public void setServicos(List<ServicoDTO> servicos) {
        this.servicos = servicos;
    }
    public List<Profissional> getProfissionais() {
        return profissionais;
    }
    public void setProfissionais(List<Profissional> profissionais) {
        this.profissionais = profissionais;
    }

}
