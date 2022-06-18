package com.pds.backend.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pds.backend.entidades.Profissional;

@Repository
public interface ProfissionalRepository extends JpaRepository<Profissional, Long> {
    
}
