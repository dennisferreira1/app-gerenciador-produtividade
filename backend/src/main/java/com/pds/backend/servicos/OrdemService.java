package com.pds.backend.servicos;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pds.backend.dominio.dto.OrdemServicoDTO;
import com.pds.backend.dominio.dto.ServicoDTO;
import com.pds.backend.dominio.entidades.ExecucaoOrdemServico;
import com.pds.backend.dominio.entidades.OrdemDeServico;
import com.pds.backend.dominio.entidades.Quantitativo;
import com.pds.backend.dominio.entidades.Servico;
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

    public OrdemDeServico cadastrarOrdem(OrdemServicoDTO ordemDTO) {
        var ordemServico = new OrdemDeServico();
        ordemServico.setDescricao(ordemDTO.getDescricao());
        ordemServico.setNumeroRequisicao(ordemDTO.getNumero());
        ordemServico.setExecucaoOrdemServico(new ExecucaoOrdemServico(ordemDTO.getProfissionais()));
        ordemServico.setQuantitativos(
            ordemDTO.getServicos()
                .stream()
                .map((ServicoDTO servicoDTO) -> new Quantitativo(new Servico(servicoDTO.getId(), servicoDTO.getDescricao(), servicoDTO.getUnd()), servicoDTO.getQuantidade()))
                .toList()
        );

        
        return ordemRepository.saveAndFlush(ordemServico);
    }

    
    public OrdemDeServico atualizarOrdem(Long id, OrdemServicoDTO ordemDTO) {
        OrdemDeServico ordemBuscada = buscarOrdemPorId(id);
        
        ordemBuscada.setDescricao(ordemDTO.getDescricao());
        ordemBuscada.setNumeroRequisicao(ordemDTO.getNumero());
        ordemBuscada.getExecucaoOrdemServico().setProfissionais(ordemDTO.getProfissionais());
        
        /*ordemBuscada.setQuantitativos(
             ordemDTO.getServicos()
                .stream()
                .map((ServicoDTO servicoDTO) -> new Quantitativo(new Servico(servicoDTO.getId(), servicoDTO.getDescricao(), servicoDTO.getUnd()), servicoDTO.getQuantidade()))
                .toList()
        );*/ 

        return ordemRepository.save(ordemBuscada);
    }

    public void excluirOrdem(Long id) {
        OrdemDeServico ordemBuscada = ordemRepository.findById(id).orElseThrow();
        ordemRepository.delete(ordemBuscada);
    }

    public OrdemDeServico buscarOrdemPorId(Long id) {
        return ordemRepository.findById(id).orElseThrow();
    }

}
