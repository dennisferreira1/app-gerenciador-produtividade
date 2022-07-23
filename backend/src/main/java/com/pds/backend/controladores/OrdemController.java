package com.pds.backend.controladores;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.pds.backend.dominio.dto.OrdemServicoDTO;
import com.pds.backend.servicos.OrdemService;

@RestController
@RequestMapping("api/ordens-de-servicos")
public class OrdemController {

    private final OrdemService ordemService;
    
    public OrdemController(OrdemService ordemService) {
        this.ordemService = ordemService;
    }

    @GetMapping
    public ResponseEntity<List<OrdemServicoDTO>> buscarOrdens() {
        return ResponseEntity.ok(ordemService.buscarOrdens());
    }

    @PostMapping
    public ResponseEntity<OrdemServicoDTO> cadastrarOrdem(@RequestBody OrdemServicoDTO ordemDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.ordemService.cadastrarOrdem(ordemDTO));
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<OrdemServicoDTO> atualizarOrdem(@PathVariable Long id, @RequestBody OrdemServicoDTO ordemDTO) {
        return ResponseEntity.status(HttpStatus.OK).body(this.ordemService.atualizarOrdem(id, ordemDTO));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluirOrdem(@PathVariable Long id) {
        this.ordemService.excluirOrdem(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrdemServicoDTO> buscarOrdemPorId(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(this.ordemService.buscarOrdemPorId(id));
    }

    @GetMapping("/profissional-id/{profissionalId}")
    public ResponseEntity<List<OrdemServicoDTO>> buscarOrdensPorProfissional(@PathVariable Long profissionalId) {
        return ResponseEntity.ok(ordemService.buscarOrdensPorProfissional(profissionalId));
    }

}
