package com.pds.backend.controladores;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.pds.backend.entidades.OrdemDeServico;
import com.pds.backend.servicos.OrdemService;

@RestController
@RequestMapping("/ordens-de-servicos")
public class OrdemController {

    private final OrdemService ordemService;
    
    public OrdemController(OrdemService ordemService) {
        this.ordemService = ordemService;
    }

    @GetMapping
    public ResponseEntity<List<OrdemDeServico>> buscarOrdens() {
        return ResponseEntity.ok(ordemService.buscarOrdens());
    }

    @PostMapping
    public ResponseEntity<OrdemDeServico> cadastrarOrdem(@RequestBody OrdemDeServico ordem) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.ordemService.cadastrarOrdem(ordem));
    }

    /*
    @PutMapping("/{id}")
    public ResponseEntity<OrdemDeServico> atualizarOrdem(@PathVariable Long id, @RequestBody OrdemDeServico ordem) {
        return ResponseEntity.status(HttpStatus.OK).body(this.ordemService.atualizarOrdem(id, ordem));
    } */

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluirOrdem(@PathVariable Long id) {
        this.ordemService.excluirOrdem(id);
    }

}
