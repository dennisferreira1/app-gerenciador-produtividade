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

import com.pds.backend.dominio.entidades.Profissional;
import com.pds.backend.servicos.ProfissionalService;

@RestController
@RequestMapping("api/profissionais")
public class ProfissionalController {

    private final ProfissionalService profissionalService;
    
    public ProfissionalController(ProfissionalService profissionalService) {
        this.profissionalService = profissionalService;
    }

    @GetMapping
    public ResponseEntity<List<Profissional>> buscarProfissionais() {
        return ResponseEntity.ok(profissionalService.buscarProfissionais());
    }

    @PostMapping
    public ResponseEntity<Profissional> cadastrarProfissional(@RequestBody Profissional profissional) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.profissionalService.cadastrarProfissional(profissional));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Profissional> atualizarProfissional(@PathVariable Long id, @RequestBody Profissional profissional) {
        return ResponseEntity.status(HttpStatus.OK).body(this.profissionalService.atualizarProfissional(id, profissional));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluirProfissional(@PathVariable Long id) {
        this.profissionalService.excluirProfissional(id);
    }

}
