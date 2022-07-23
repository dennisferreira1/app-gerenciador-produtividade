package com.pds.backend.dominio.dto;

public class ServicoDTO {

    private Long id;
    private String descricao;
    private String und;
    private Double quantidade;
    private Double horasParaExecutar1Und;
    
    public ServicoDTO() {
    }

    public ServicoDTO(Long id, String descricao, Double quantidade, String und, Double horasParaExecutar1Und) {
        this.id = id;
        this.descricao = descricao;
        this.und = und;
        this.quantidade = quantidade;
        this.horasParaExecutar1Und = horasParaExecutar1Und;
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
    public Double getQuantidade() {
        return quantidade;
    }
    public void setQuantidade(Double quantidade) {
        this.quantidade = quantidade;
    }

    public Double getHorasParaExecutar1Und() {
        return horasParaExecutar1Und;
    }

    public void setHorasParaExecutar1Und(Double horasParaExecutar1Und) {
        this.horasParaExecutar1Und = horasParaExecutar1Und;
    }

}
