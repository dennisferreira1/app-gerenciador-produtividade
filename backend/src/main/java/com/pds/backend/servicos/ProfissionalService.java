package com.pds.backend.servicos;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pds.backend.dominio.entidades.Profissional;
import com.pds.backend.repositorios.ProfissionalRepository;

@Service
public class ProfissionalService {

    private final ProfissionalRepository profissionalRepository;

    public ProfissionalService(ProfissionalRepository profissionalRepository) {
        this.profissionalRepository = profissionalRepository;
    }

    public List<Profissional> buscarProfissionais() {
        return profissionalRepository.findAll();
    }

    public Profissional cadastrarProfissional(Profissional profissional) {
        return profissionalRepository.save(profissional);
    }

    public Profissional atualizarProfissional(Long id, Profissional profissional) {
        Profissional profissionalBuscado = profissionalRepository.findById(id).orElseThrow();

        profissionalBuscado.setNome(profissional.getNome());
        profissionalBuscado.setProfissao(profissional.getProfissao());

        return profissionalRepository.save(profissionalBuscado);
    }

    public void excluirProfissional(Long id) {
        Profissional profissionalBuscado = profissionalRepository.findById(id).orElseThrow();
        profissionalRepository.delete(profissionalBuscado);
    }

    public Profissional buscarProfissionalPorId(Long id) {
        return profissionalRepository.findById(id).orElseThrow();
    }
    
}
