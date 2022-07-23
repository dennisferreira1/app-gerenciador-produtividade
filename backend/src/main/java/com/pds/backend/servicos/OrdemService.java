package com.pds.backend.servicos;

import java.util.List;
import java.util.Objects;

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

        var quantitativos = ordemDTO.getServicos()
                .stream()
                .map((ServicoDTO servicoDTO) -> new Quantitativo(
                        new Servico(servicoDTO.getId(), servicoDTO.getDescricao(), servicoDTO.getUnd(), servicoDTO.getHorasParaExecutar1Und()),
                        servicoDTO.getQuantidade()))
                .toList();

        var totalHorasQuantitativos = 0.0;
        for (Quantitativo q : quantitativos) {
            ordemServico.addQuantitavo(q);
            totalHorasQuantitativos += q.getServico().getHorasParaExecutar1Und() * q.getQuantidade();
        }

        ordemServico.setTotalHorasExecucao(totalHorasQuantitativos);
        ordemServico = ordemRepository.saveAndFlush(ordemServico);

        return convertParaDTO(ordemServico);
    }

    public OrdemServicoDTO atualizarOrdem(Long id, OrdemServicoDTO ordemDTO) {
        OrdemDeServico ordemBuscada = ordemRepository.findById(id).orElseThrow();

        ordemBuscada.setDescricao(ordemDTO.getDescricao());
        ordemBuscada.setNumeroRequisicao(ordemDTO.getNumero());
        ordemBuscada.getExecucaoOrdemServico().setProfissionais(ordemDTO.getProfissionais());

        var quantitativos = ordemDTO.getServicos()
                .stream()
                .map((ServicoDTO servicoDTO) -> new Quantitativo(
                        new Servico(servicoDTO.getId(), servicoDTO.getDescricao(), servicoDTO.getUnd(), servicoDTO.getHorasParaExecutar1Und()),
                        servicoDTO.getQuantidade()))
                .toList();

        // remove os quantitativos existentes
        ordemBuscada.getQuantitativos().clear();

        var totalHorasQuantitativos = 0.0;
        // insere os novos quantitativos
        for (Quantitativo q : quantitativos) {
            ordemBuscada.addQuantitavo(q);
            totalHorasQuantitativos += q.getServico().getHorasParaExecutar1Und() * q.getQuantidade();
        }

        ordemBuscada.setTotalHorasExecucao(totalHorasQuantitativos);

        return convertParaDTO(ordemRepository.saveAndFlush(ordemBuscada));
    }

    public void excluirOrdem(Long id) {
        OrdemDeServico ordemBuscada = ordemRepository.findById(id).orElseThrow();
        ordemRepository.delete(ordemBuscada);
    }

    public OrdemServicoDTO buscarOrdemPorId(Long id) {
        return convertParaDTO(ordemRepository.findById(id).orElseThrow());
    }

    public List<OrdemServicoDTO> buscarOrdensPorProfissional(Long profissionalId) {
        return ordemRepository.findAll()
                .stream()
                .filter((os) -> {
                    var profissionais = os.getExecucaoOrdemServico().getProfissionais();
                    var retorno = false;
                    for(var p : profissionais) {
                        if (Objects.equals(p.getId(), profissionalId)) {
                            retorno = true;
                        }
                    }
                    return retorno;
                })
                .map((OrdemDeServico ordem) -> convertParaDTO(ordem))
                .toList();
    }

    private OrdemServicoDTO convertParaDTO(OrdemDeServico ordemServico) {
        var dto = new OrdemServicoDTO();
        dto.setId(ordemServico.getId());
        dto.setNumero(ordemServico.getNumeroRequisicao());
        dto.setDescricao(ordemServico.getDescricao());
        dto.setProfissionais(ordemServico.getExecucaoOrdemServico().getProfissionais());
        dto.setServicos(ordemServico.getQuantitativos()
                .stream()
                .map((Quantitativo q) -> new ServicoDTO(q.getServico().getId(), q.getServico().getDescricao(),
                        q.getQuantidade(), q.getServico().getUnd(), q.getServico().getHorasParaExecutar1Und()))
                .toList());
        dto.setTotalHorasExecucao(ordemServico.getTotalHorasExecucao());

        return dto;
    }

}
