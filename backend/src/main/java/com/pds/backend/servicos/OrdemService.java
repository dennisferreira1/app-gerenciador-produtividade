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

    public List<OrdemServicoDTO> buscarOrdens() {
        return ordemRepository.findAll()
                    .stream()
                    .map((OrdemDeServico ordem) -> convertParaDTO(ordem))
                    .toList();
    }

    public OrdemServicoDTO cadastrarOrdem(OrdemServicoDTO ordemDTO) {
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

        ordemServico = ordemRepository.saveAndFlush(ordemServico);
        return convertParaDTO(ordemServico);
    }


    public OrdemServicoDTO atualizarOrdem(Long id, OrdemServicoDTO ordemDTO) {
        OrdemDeServico ordemBuscada = ordemRepository.findById(id).orElseThrow();
        
        ordemBuscada.setDescricao(ordemDTO.getDescricao());
        ordemBuscada.setNumeroRequisicao(ordemDTO.getNumero());
        ordemBuscada.getExecucaoOrdemServico().setProfissionais(ordemDTO.getProfissionais());
        
        /*ordemBuscada.setQuantitativos(
             ordemDTO.getServicos()
                .stream()
                .map((ServicoDTO servicoDTO) -> new Quantitativo(new Servico(servicoDTO.getId(), servicoDTO.getDescricao(), servicoDTO.getUnd()), servicoDTO.getQuantidade()))
                .toList()
        );*/ 

        return convertParaDTO(ordemRepository.save(ordemBuscada));
    }

    public void excluirOrdem(Long id) {
        OrdemDeServico ordemBuscada = ordemRepository.findById(id).orElseThrow();
        ordemRepository.delete(ordemBuscada);
    }

    public OrdemServicoDTO buscarOrdemPorId(Long id) {
        return convertParaDTO(ordemRepository.findById(id).orElseThrow());
    }

    private OrdemServicoDTO convertParaDTO(OrdemDeServico ordemServico) {
        var dto = new OrdemServicoDTO();
        dto.setId(ordemServico.getId());
        dto.setNumero(ordemServico.getNumeroRequisicao());
        dto.setDescricao(ordemServico.getDescricao());
        dto.setProfissionais(ordemServico.getExecucaoOrdemServico().getProfissionais());
        dto.setServicos(ordemServico.getQuantitativos()
            .stream()
            .map((Quantitativo q) -> new ServicoDTO(q.getId(),q.getServico().getDescricao(),q.getQuantidade(), q.getServico().getUnd()))
            .toList()
        );

        return dto;
    }

}
