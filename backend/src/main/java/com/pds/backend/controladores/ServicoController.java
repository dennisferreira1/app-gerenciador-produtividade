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

import com.pds.backend.dominio.dto.ServicoDTO;
import com.pds.backend.servicos.ServicoService;

@RestController
@RequestMapping("api/servicos")
public class ServicoController {

    private final ServicoService servicoService;
    
    public ServicoController(ServicoService servicoService) {
        this.servicoService = servicoService;
    }

    @GetMapping
    public ResponseEntity<List<ServicoDTO>> buscarServicos() {
        return ResponseEntity.ok(servicoService.buscarServicos());
    }

    @PostMapping
    public ResponseEntity<ServicoDTO> cadastrarServico(@RequestBody ServicoDTO servicoDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.servicoService.cadastrarServico(servicoDTO));
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<ServicoDTO> atualizarServico(@PathVariable Long id, @RequestBody ServicoDTO servicoDTO) {
        return ResponseEntity.status(HttpStatus.OK).body(this.servicoService.atualizarServico(id, servicoDTO));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluirOrdem(@PathVariable Long id) {
        this.servicoService.excluirServico(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServicoDTO> buscarServicoPorId(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(this.servicoService.buscarServicoPorId(id));
    }

}
