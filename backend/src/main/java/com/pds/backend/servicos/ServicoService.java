package com.pds.backend.servicos;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pds.backend.dominio.dto.ServicoDTO;
import com.pds.backend.dominio.entidades.Servico;
import com.pds.backend.repositorios.ServicoRepository;

@Service
public class ServicoService {

    private final ServicoRepository servicoRepository;

    public ServicoService(ServicoRepository servicoRepository) {
        this.servicoRepository = servicoRepository;
    }

    public List<ServicoDTO> buscarServicos() {
        return servicoRepository.findAll()
                .stream()
                .map((Servico servico) -> convertParaDTO(servico))
                .toList();
    }

    public ServicoDTO cadastrarServico(ServicoDTO servicoDTO) {
        var servico = new Servico();
        servico.setDescricao(servicoDTO.getDescricao());
        servico.setUnd(servicoDTO.getUnd());
        servico.setHorasParaExecutar1Und(servicoDTO.getHorasParaExecutar1Und());

        servico = servicoRepository.saveAndFlush(servico);

        return convertParaDTO(servico);
    }

    public ServicoDTO atualizarServico(Long id, ServicoDTO servicoDTO) {
        Servico servicoBuscado = servicoRepository.findById(id).orElseThrow();

        servicoBuscado.setDescricao(servicoDTO.getDescricao());
        servicoBuscado.setUnd(servicoDTO.getUnd());
        servicoBuscado.setHorasParaExecutar1Und(servicoDTO.getHorasParaExecutar1Und());

        return convertParaDTO(servicoRepository.saveAndFlush(servicoBuscado));
    }

    public void excluirServico(Long id) {
        Servico servicoBuscado = servicoRepository.findById(id).orElseThrow();
        servicoRepository.delete(servicoBuscado);
    }

    public ServicoDTO buscarServicoPorId(Long id) {
        return convertParaDTO(servicoRepository.findById(id).orElseThrow());
    }

    private ServicoDTO convertParaDTO(Servico servico) {
        var dto = new ServicoDTO();
        dto.setId(servico.getId());
        dto.setDescricao(servico.getDescricao());
        dto.setUnd(servico.getUnd());
        dto.setHorasParaExecutar1Und(servico.getHorasParaExecutar1Und());

        return dto;
    }
}
