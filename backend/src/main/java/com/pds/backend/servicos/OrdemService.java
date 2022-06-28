package com.pds.backend.servicos;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pds.backend.entidades.ExecucaoOrdemServico;
import com.pds.backend.entidades.OrdemDeServico;
import com.pds.backend.entidades.OrdemServicoDTO;
import com.pds.backend.entidades.Quantitativo;
import com.pds.backend.entidades.Servico;
import com.pds.backend.entidades.ServicoDTO;
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

    /*
     * public Profissional atualizarOrdem(Long id, OrdemDeServico ordem) {
     * //OrdemDeServico ordemBuscada = ordemRepository.findById(id).orElseThrow();
     * 
     * //profissionalBuscado.setNome(profissional.getNome());
     * //profissionalBuscado.setProfissao(profissional.getProfissao());
     * 
     * //return ordemRepository.save(profissionalBuscado);
     * }
     */

    public void excluirOrdem(Long id) {
        OrdemDeServico ordemBuscada = ordemRepository.findById(id).orElseThrow();
        ordemRepository.delete(ordemBuscada);
    }

}
