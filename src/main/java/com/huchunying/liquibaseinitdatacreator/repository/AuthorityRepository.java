package com.huchunying.liquibaseinitdatacreator.repository;

import com.huchunying.liquibaseinitdatacreator.domain.Authority;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Authority entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
