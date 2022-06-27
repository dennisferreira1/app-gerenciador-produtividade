package com.pds.backend.servicos;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pds.backend.entidades.OrdemDeServico;
import com.pds.backend.repositorios.OrdemRepository;


@Service
public class OrdemService {

    private final OrdemRepository ordemRepository;

    public OrdemService(OrdemRepository ordemRepository) {
        this.ordemRepository = ordemRepository;
    }

    public List<OrdemDeServico> buscarOrdens() {
        return ordemRepository.findAll();
    }

    public OrdemDeServico cadastrarOrdem(OrdemDeServico ordem) {
        return ordemRepository.saveAndFlush(ordem);
    }

    /*
    public Profissional atualizarOrdem(Long id, OrdemDeServico ordem) {
        //OrdemDeServico ordemBuscada = ordemRepository.findById(id).orElseThrow();

        //profissionalBuscado.setNome(profissional.getNome());
        //profissionalBuscado.setProfissao(profissional.getProfissao());

        //return ordemRepository.save(profissionalBuscado);
    } */

    public void excluirOrdem(Long id) {
        OrdemDeServico ordemBuscada = ordemRepository.findById(id).orElseThrow();
        ordemRepository.delete(ordemBuscada);
    }
    
}
